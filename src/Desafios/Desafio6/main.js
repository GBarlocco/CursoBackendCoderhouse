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


const ContenedorP = require(`./contenedorProducto.js`);
const ContenedorC = require(`./contenedorChat.js`);
let contenedorProductos = new ContenedorP(`./productos.txt`);
let contenedorChat = new ContenedorC(`./mensajes.txt`);

let users = [];

app.get(`/`, (req, res) => {
    const data = {
        title: "Desafio Nº6 - Websockets",
        content: "En la web se podrán ingresar productos, chatear en tiempo real"
    }
    return res.render(`index`, data);
});

app.get(`/form`, (req, res) => res.render(`formProductos`));

app.get(`/login`, (req, res) => res.render(`login`));

app.post(`/login`, (req, res) => {
    const { userName } = req.body;

    return res.redirect(`/chat?userName=${userName}`);
});

app.get(`/chat`, (req, res) => res.render('chat'));


//Evento de conexión cliente
io.on(`connection`, socket => {
    // ***************************************
    // ********* socket formProductos ******** 
    // ***************************************

    socket.on(`sendProduct`, () => {
        ; (async () => {
            try {
                allProducts = await contenedorProductos.getAll();

                //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
                socket.emit(`allProducts`, allProducts);
            } catch (err) {
                return res.status(404).json({
                    error: `Error ${err}`
                });
            }
        })();
    });

    socket.on(`addProducts`, data => {
        ; (async () => {

            const newProducto = {
                title: `${data.name}`,
                price: Number(data.price),
                thumbnail: `${data.img}`
            };
            const id = await contenedorProductos.save(newProducto);

            const product = await contenedorProductos.getById(id);

            //Envio el producto nuevo a todos los clientes conectados
            io.sockets.emit(`refreshTable`, product);
        })();

    });


    // ***********************************
    // *********** socket chat *********** 
    // ***********************************

    //Cliente --> Servidor: joinChat event
    socket.on(`joinChat`, ({ userName }) => {
        ; (async () => {
            users.push({
                id: socket.id,
                userName: userName,
                avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png"
            });

            //Servidor --> Cliente : bienvenida al usuario que se conecta.
            socket.emit(`notification`, `Bienvenido ${userName}`);

            try {
                allMessage = await contenedorChat.getAll();
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
        })();
    });

    //Cliente --> Servidor: messageInput event
    socket.on(`messageInput`, data => {
        ; (async () => {
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
        })();
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