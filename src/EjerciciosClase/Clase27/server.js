const express = require(`express`);

const config = require(`./config`);

const app = express();

app.get(`/`, (req, res) => {
    res.json({ env: config.env });
});

app.listen(config.port, config.host, () => {
    console.log(`Servidor corriendo en http://${config.host}:${config.port}`);
});
