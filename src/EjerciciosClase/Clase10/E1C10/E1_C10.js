const express = require(`express`);
const app = express();

app.set(`views`, `./views`);
app.set(`view engine`, `pug`);

app.get(``,(req,res) => res.json({status: `ok`}));

//http://localhost:8080/datos?title=%3Ci%3EMedidor%3C/i%3E&nivel=10&min=5&max=60
app.get(`/datos`, (req, res) => {
    const min = req.query.min;
    const nivel = req.query.nivel;
    const max = req.query.max;
    const tilte = req.query.title;

    const data = {
        min:min,
        nivel:nivel,
        max:max,
        title:tilte
    }
    return res.render(`meter`, data);
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP corriendo en puerto ${PORT}`);
});

server.on(`error`, error => console.log(`error en el servidor ${error}`));