const express = require(`express`);

const app = express();

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

app.get(`/api/mensajes/`, (req, res) => {
    console.log(`Request recibido`);

    if (!req.query.title) {
        return res.json(messages);
    }

    const messageFilttered = messages.filter(message => message.title === req.query.title);
    return res.json(messageFilttered);

});

app.get(`/api/mensajes/:id`, (req, res) => {
    console.log(`Request recibido /api/mensajes/:id`);

    const id = Number(req.params.id);
    console.log(`id: ${id}`);

    const messageFilttered = messages.find(message => message.id === id);

    if (!messageFilttered) {
        return res.status(404).json({
            error: `mensaje no encontrado`
        });
    };

    return res.json(messageFilttered);
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando puerto ${PORT}`);
});

server.on(`error`, err => {
    console.log(`error en el servidor: ${err}`)
})