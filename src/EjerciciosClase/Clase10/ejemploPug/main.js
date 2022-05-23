const express = require(`express`);
const app = express();

app.set(`views`, `./views`);
app.set(`view engine`, `pug`);

app.get(``,(req,res) => res.json({status: `ok`}));

app.get(`/hello`, (req, res) => {
    const data = {
        mensaje: `A prendiendo pug JS` 
    }
    return res.render(`hello`, data);
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP corriendo en puerto ${PORT}`);
});

server.on(`error`, error => console.log(`error en el servidor ${error}`));