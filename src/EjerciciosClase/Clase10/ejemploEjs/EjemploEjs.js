const express = require(`express`);
const app = express();

app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

app.get(`/`, (req, res) => res.json({ status: `ok` }));


app.get(`/message`, (req, res) => {
    const data = {
        message: {
            name: `Aprendiendo Ejs`
        }
    };
    return res.render(`message`, data);
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP corriendo en puerto ${PORT}`);
});

server.on(`error`, error => console.log(`error en el servidor ${error}`));