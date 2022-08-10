const express = require(`express`);
const compression = require(`compression`);

const app = express();

app.get(`/saludo`, (req, res) => {
    res.send(`Hola que tal!`.repeat(1000));
});

app.get(`/saludozip`, compression(), (req, res) => {
    res.send(`Hola que tal!`.repeat(1000));
});

PORT = 8080;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

