const express = require(`express`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;


let messages = [
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

app.post(`/api/mensajes`, (req, res) => {
    console.log(`POST request recibido`);
    console.log({ body: req.body })

    const newMessage = req.body;
    newMessage.id = messages.length + 1;

    messages.push(newMessage);

    return res.status(201).json(newMessage);

});

app.put(`/api/mensajes/:id`, (req, res) => {
    console.log(`PUT request recibido`);

    const id= Number(req.params.id);
    const messageIndex = messages.findIndex(message => message.id === id);

    if (messageIndex < 0){
        return res.status(401).json({
            error: "mensaje no encontrado"
        });
    }

    const body = req.body;

    messages[messageIndex].title = body.title;
    messages[messageIndex].message = body.message;

    return res.json(messages[messageIndex]);

});

app.delete(`/api/mensajes/:id`, (req, res) => {
    console.log(`DELETE request recibido`);

    const id= Number(req.params.id);
    const messageIndex = messages.findIndex(message => message.id === id);

    if (messageIndex < 0){
        return res.status(401).json({
            error: "mensaje no encontrado"
        });
    }

    messages = messages.filter(message => message.id != id);


    return res.status(204).json({});
});

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando puerto ${PORT}`);
});

server.on(`error`, err => {
    console.log(`error en el servidor: ${err}`)
})
