const MessageDAOMongoDB = require(`../daos/MessageDAOMongoDB`);
const mongoose = require('mongoose');


//Instancia contenedores:
const storageMessages = new MessageDAOMongoDB();
let users = [];

const socketIoChat = (io) => {
    //socket chat
    io.on(`connection`, socket => {
        //Cliente --> Servidor: joinChat event
        socket.on(`joinChat`, async ({ aliasName }) => {
            users.push({
                id: socket.id,
                aliasName: aliasName,
                avatar: "https://cdn-icons-png.flaticon.com/512/456/456141.png"
            });

            //Servidor --> Cliente : bienvenida al usuario que se conecta.
            socket.emit(`notification`, `Bienvenido ${aliasName}`);


            //const allMessageFromDB = await selectAllMessage();
            const allMessageFromDB = await storageMessages.getAll();


            //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
            socket.emit(`allMenssage`, allMessageFromDB);


            //Servidor --> Cliente : bienvenida a todos los usuarios menos al que inicio la conexión:
            socket.broadcast.emit(`notification`, `${aliasName} se ha unido al chat`);

            //Servidor --> cliente: enviamos a todos los usuarios la lista actualizada de participantes:
            io.sockets.emit(`users`, users);
        });

        //Cliente --> Servidor: messageInput event
        socket.on(`messageInput`, async data => {
            const user = users.find(user => user.id === socket.id);

            const newMessage = {
                author: {
                    id: user.aliasName,
                    nombre: `Hard-code: Nombre del usuario`,
                    apellido: `Hard-code: Apellido del usuario`,
                    edad: `Hard-code: Edad`,
                    alias: `Hard-code: alias del usuario`,
                    avatar: `Hard-code: url avatar`
                },
                text: {
                    id: mongoose.Types.ObjectId(),
                    mensaje: data,
                }
            }

            await storageMessages.save(newMessage);

            //Servidor --> Cliente: envio mensaje
            socket.emit(`message`, newMessage);

            socket.broadcast.emit(`message`, newMessage);
        });

        // Cliente --> Servidor: un cliente se desconecta.
        socket.on('disconnect', reason => {
            const user = users.find(user => user.id === socket.id);
            users = users.filter(user => user.id !== socket.id);

            if (user) {
                socket.broadcast.emit(`notification`, `${user.aliasName} se ha ido del chat`);
            }

            io.sockets.emit(`users`, users);
        });
    });

}

module.exports = socketIoChat;