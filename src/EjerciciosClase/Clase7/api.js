const express = require(`express`);

const app = express();

const PORT = 8080;

const messages =
    [
        {
            id: 1,
            title: `ok`,
            message: ``,
        },
        {
            id: 2,
            title: `nok`,
            message: ``,
        },
    ]

app.get(`api/mensajes`, (req, res) => {

})


const server = app.listen(PORT, () => {
    console.log(`servidor HTTP escuchando puerto ${PORT}`);
});

server.on(`error`, error => console.log(` Error en servidor : ${error}`));