const express = require(`express`);
const { Server: HttpServer } = require(`http`);
const { Server: IOServer } = require(`socket.io`);

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static(`./public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

const PORT = 8081;

httpServer.listen(PORT, () => console.log(`Servidor escuchando el puerto ${PORT}`));

const ContenedorC = require(`./contenedorChat.js`);

let contenedorChat = new ContenedorC(`./mensajes.txt`);

let users = [];

// CRUD db
const { selectAllProducts } = require(`./db/selectAllProducts`);
const { insertProduct } = require(`./db/insertProduct`);
const { selectAllMessage } = require(`./db/selectAllMessage`);

//Routers import
const homeRouter = require(`./routers/homeRouter`);
const formRouter = require(`./routers/formRouter`);
const loginRouterGet = require(`./routers/loginRouterGet`);
const loginRouterPost = require(`./routers/loginRouterPost`);
const chatRouter = require(`./routers/chatRouter`);

//Routers
app.use(`/`, homeRouter);
app.use(`/form`, formRouter);
app.use(`/login`, loginRouterGet);
app.use(`/login`, loginRouterPost);
app.use(`/chat`, chatRouter);

//socket Products
io.on(`connection`, socket => {
    socket.on(`sendProduct`, async () => {
        try {
            const allProductsFromDB = await selectAllProducts();

            //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
            socket.emit(`allProducts`, allProductsFromDB);
        } catch (err) {
            console.log(`Error ${err}`);
        }
    });

    socket.on(`addProducts`, async data => {
        try {
            const newProducto = {
                title: `${data.name}`,
                price: Number(data.price),
                thumbnail: `${data.img}`
            };

            const product = await insertProduct(newProducto);

            //Envio el producto nuevo a todos los clientes conectados
            io.sockets.emit(`refreshTable`, [product]);

        } catch (err) {
            console.log(`Error ${err}`);
        }
    });
});

//socket chat
io.on(`connection`, socket => {
    //Cliente --> Servidor: joinChat event
    socket.on(`joinChat`, async ({ userName }) => {
        users.push({
            id: socket.id,
            userName: userName,
            avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png"
        });

        //Servidor --> Cliente : bienvenida al usuario que se conecta.
        socket.emit(`notification`, `Bienvenido ${userName}`);

        try {
            const allMessage = await contenedorChat.getAll();

            const allMessageFromDB = await selectAllMessage();
            console.table(allMessageFromDB);


            //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
            socket.emit(`allMenssage`, allMessage);
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }

        //Servidor --> Cliente : bienvenida a todos los usuarios menos al que inicio la conexión:
        socket.broadcast.emit(`notification`, `${userName} se ha unido al chat`);

        //Servidor --> cliente: enviamos a todos los usuarios la lista actualizada de participantes:
        io.sockets.emit(`users`, users);
    });

    //Cliente --> Servidor: messageInput event
    socket.on(`messageInput`, async data => {

        const now = new Date();
        const user = users.find(user => user.id === socket.id);
        const message = {
            text: data,
            time: `${now.getHours()}:${now.getMinutes()}`,
            user
        };

        //Servidor --> Cliente: envio mensaje
        socket.emit(`message`, message);

        socket.broadcast.emit(`message`, message);

        await contenedorChat.save(message);
    });

    // Cliente --> Servidor: un cliente se desconecta.
    socket.on('disconnect', reason => {
        const user = users.find(user => user.id === socket.id);
        users = users.filter(user => user.id !== socket.id);

        if (user) {
            socket.broadcast.emit(`notification`, `${user.userName} se ha ido del chat`);
        }

        io.sockets.emit(`users`, users);
    });
});