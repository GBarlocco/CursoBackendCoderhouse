const express = require(`express`);
const { Server: HttpServer } = require(`http`);
const { Server: IOServer } = require(`socket.io`);

const MessageDAOMongoDB = require(`./daos/MessageDAOMongoDB`);
const mongoose = require('mongoose');

const faker = require(`faker`);

const normalizr = require(`normalizr`);
const { normalize, denormalize, schema } = require(`normalizr`);
const util = require(`util`);

const MongoStore = require(`connect-mongo`);

const session = require(`express-session`);

const { Router } = require("express");

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

let users = [];

//CRUD db
const { selectAllProducts } = require(`./db/selectAllProducts`);
const { insertProduct } = require(`./db/insertProduct`);

//Routers import
const homeRouter = require(`./routers/homeRouter`);

//Routers
app.use(`/`, homeRouter);


//Instancia contenedores:
const storageMessages = new MessageDAOMongoDB();

// *********************************************************** Desafio 12 ***********************************************************
const router = Router();

optionsMongo = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://gaston:plcJVQX38JLWkNty@cluster0.opdu9wz.mongodb.net/desafio12?retryWrites=true&w=majority",
        mongoOptions: optionsMongo,
        ttl: 10
    }),
    secret: '123456',
    resave: true,
    saveUninitialized: true
}));

app.use('/', router);

router.get(`/loginSession`, (req, res) => {
    res.render("loginSession");
    req.session.destroy(err => {
        if (!err) {
            console.log(`ok`)
        } else {
            console.log(`error`)
        }
    });
});

router.get(`/api/productos-test`, (req, res) => {
    const user = req.query.nameLogin;

    req.session.usuario = user;

    const dataRandom = [];
    const data = {
        dataRandom: dataRandom,
        nameLogin: req.session.usuario
    };

    for (let i = 0; i < 5; i++) {
        dataRandom.push({
            nombre: faker.commerce.productName(),
            precio: faker.commerce.price(),
            foto: faker.image.image()
        });
    }
    res.render('faker', data);
});

router.get(`/logout`, (req, res) => {
    userLogout = req.session.usuario;
    res.render("logout", { userLogout });
    req.session.destroy(err => {
        if (!err) {
            console.log(`ok`)
        } else {
            console.log(`error`)
        }
    });

});


/*
    app.use(session({
        secret: `pass`,
        resave: true,
        saveUninitialized: true
    }));
*/
// *********************************************************** Desafio 12 ***********************************************************



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
            //const allMessageFromDB = await selectAllMessage();
            const allMessageFromDB = await storageMessages.getAll();


            const dataJson = {
                "id": 1,
                "mensajes": [
                    {
                        "id": "barlocco@hotmail.es",
                        "author": {
                            "id": "barlocco@hotmail.es",
                            "nombre": "Nombre del usuario",
                            "apellido": "apellido del usuario",
                            "alias": "alias del usuario",
                            "edad": 12,
                            "avatar": "avatar del usuario"
                        },
                        "text": {
                            "id": "a",
                            "mensaje": "mensaje 1"
                        }
                    },
                    {
                        "id": "asd@hotmail.es",
                        "author": {
                            "id": "asd@hotmail.es",
                            "nombre": "Nombre del usuario",
                            "apellido": "apellido del usuario",
                            "alias": "alias del usuario",
                            "edad": 12,
                            "avatar": "avatar del usuario"
                        },
                        "text": {
                            "id": "b",
                            "mensaje": "mensaje 2"
                        }
                    },
                    {
                        "id": "barlocco@hotmail.es",
                        "author": {
                            "id": "barlocco@hotmail.es",
                            "nombre": "Nombre del usuario",
                            "apellido": "apellido del usuario",
                            "alias": "alias del usuario",
                            "edad": 12,
                            "avatar": "avatar del usuario"
                        },
                        "text": {
                            "id": "c",
                            "mensaje": "mensaje 3"
                        }
                    },
                    {
                        "id": "asd@hotmail.es",
                        "author": {
                            "id": "asd@hotmail.es",
                            "nombre": "Nombre del usuario",
                            "apellido": "apellido del usuario",
                            "alias": "alias del usuario",
                            "edad": 12,
                            "avatar": "avatar del usuario"
                        },
                        "text": {
                            "id": "d",
                            "mensaje": "mensaje 4"
                        }
                    },
                    {
                        "id": "asd@hotmail.es",
                        "author": {
                            "id": "asd@hotmail.es",
                            "nombre": "Nombre del usuario",
                            "apellido": "apellido del usuario",
                            "alias": "alias del usuario",
                            "edad": 12,
                            "avatar": "avatar del usuario"
                        },
                        "text": {
                            "id": "e",
                            "mensaje": "mensaje 5"
                        }
                    },
                    {
                        "id": "pepe@hotmail.es",
                        "author": {
                            "id": "pepe@hotmail.es",
                            "nombre": "Nombre del usuario",
                            "apellido": "apellido del usuario",
                            "alias": "alias del usuario",
                            "edad": 12,
                            "avatar": "avatar del usuario"
                        },
                        "text": {
                            "id": "f",
                            "mensaje": "mensaje 6"
                        }
                    }
                ]
            };

            // Se tendrìa que leer de la DB y enviar a la funcionar normalizar dicha información.
            normalizar(dataJson);

            //Servidor --> Cliente : Se envian todos los mensajes al usuario que se conectó.
            socket.emit(`allMenssage`, allMessageFromDB);
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
        const user = users.find(user => user.id === socket.id);

        const newMessage = {
            id: user.userName,
            author: {
                id: user.userName,
                nombre: `Hard-code: Nombre del usuario`,
                apellido: `Hard-code: Apellido del usuario`,
                edad: `Hard-code: Edad`,
                alias: `Hard-code: alias del usuario`,
                avatar: `Hard-code: url avatar`
            },
            text: {
                id: mongoose.Types.ObjectId().toString(),
                mensaje: data,
            }
        }

        await storageMessages.save(newMessage);

        //Servidor --> Cliente: envio mensaje
        socket.emit(`message`, newMessage);

        socket.broadcast.emit(`message`, newMessage);

        //await insertMessage(newMessage);
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

const print = (objeto) => {
    console.log(util.inspect(objeto, false, 12, true));
}

const normalizar = (inMessage) => {

    const authorSchema = new normalizr.schema.Entity('author');

    const textSchema = new normalizr.schema.Entity('text');

    const mensajeSchema = new normalizr.schema.Entity('mensaje', {
        author: authorSchema,
        mensaje: textSchema,
    });

    constchatSchema = new normalizr.schema.Entity('chat', {
        mensajes: [mensajeSchema]
    });

    const normalizedChat = normalizr.normalize(inMessage, constchatSchema);
    const denormalizedChat = normalizr.denormalize(normalizedChat.result, constchatSchema, normalizedChat.entities);

    console.log(`==== OBJETO ORIGINAL ====`);
    console.log(`Tamaño [bytes]: ${JSON.stringify(inMessage).length}`);
    print(inMessage);

    console.log(`==== OBJETO NORMALIZADO ====`);
    console.log(`Tamaño [bytes]: ${JSON.stringify(normalizedChat).length}`);
    print(normalizedChat);

    console.log(`==== OBJETO DENORMALIZADO ====`);
    console.log(`Tamaño [bytes]: ${JSON.stringify(denormalizedChat).length}`);
    print(denormalizedChat);

}




