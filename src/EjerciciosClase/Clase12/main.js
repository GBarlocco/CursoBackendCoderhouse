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

const PORT = 8080;

httpServer.listen(PORT, () => console.log(`Servidor escuchando el puerto ${PORT}`));

let users = [];
let messages = [];

//Rutas de login
app.get(`/login`, (req, res) => res.render(`login`));

app.post(`/login`, (req, res) => {
    const { userName } = req.body;

    return res.redirect(`/chat?userName=${userName}`);
});


//Rutas de chat.
app.get(`/chat`, (req, res) => res.render('chat'));


//Evento de conexión cliente
io.on(`connection`, socket => {
    console.log(`Nuevo cliente conectado!`);

    //Cliente --> Servidor: joinChat event
    socket.on(`joinChat`, ({ userName }) => {
        users.push({
            id: socket.id,
            userName: userName,
            avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png"
        });

        //Servidor --> Cliente : bienvenida al usuario que se conecta.
        socket.emit(`notification`, `Bienvenido ${userName}`);

        //Servidor --> Cliente : bienvenida a todos los usuarios menos al que inicio la conexión:
        socket.broadcast.emit(`notification`, `${userName} se ha unido al chat`);

        //Servidor --> cliente: enviamos a todos los usuarios la lista actualizada de participantes:
        io.sockets.emit(`users`, users);
    });

    //Cliente --> Servidor: messageInput event
    socket.on(`messageInput`, data => {
        const now = new Date();
        const user = users.find(user => user.id === socket.id);
        const message = {
            text: data,
            time: `${now.getHours()}:${now.getMinutes()}`,
            user
        };
        messages.push(message);

        //Servidor --> Cliente: la idea es ubicar el texto en diferentes lugares: si lo envia el usuario a la derecha, si lo reciben los demas a la izquierda.
        //El mensaje ingresado es enviado al servidor, y luego se publica, no se debe publicar en base a lo ingresado por el frontEnd para garantizar el correcto flujo del sistema.
        socket.emit(`myMessage`, message);

        socket.broadcast.emit(`message`, message);
    });

    // Handle cuando un cliente se desconecta
    socket.on('disconnect', reason => {
        const user = users.find(user => user.id === socket.id);
        users = users.filter(user => user.id !== socket.id);

        if (user) {
            socket.broadcast.emit(`notification`, `${user.userName} se ha ido del chat`);
        }

        io.sockets.emit(`users`, users);
    });
});


