const express = require(`express`);
const { Router } = express; // const Router = express.Router

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HHTP escuchando puerto ${PORT}`);
});

server.on(`error`, err => {
    console.log(`error en el servidor ${err}`);
});

const messages = [
    {
        id: 1,
        title: `OK`,
        message: ``
    },
    {
        id: 2,
        title: `NOK`,
        message: ``
    },
];

const messagesRouter = Router();

app.use(`/api/mensajes`, messagesRouter);

messagesRouter.get(``, (req, res) => {
    return res.json(messages);
})

messagesRouter.post(``, (req, res) => {
    const newMessage = req.body;

    newMessage.id = messages.length + 1;

    messages.push(newMessage);

    return res.status(201).json(newMessage);
});



