const express = require(`express`);

const compression = require(`compression`);

const app = express();

app.use(compression());

app.get(`/`, (req, res) => {
    const message = `Bienvenido!!`;

    return res.send(message.repeat(1000));
});

const PORT = process.argv[2] || 8081;

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));