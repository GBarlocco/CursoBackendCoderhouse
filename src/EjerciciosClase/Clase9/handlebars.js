const express = require(`express`);
const app = express();

const { engine } = require(`express-handlebars`);

const engineFn = engine({
    extname: `.hbs`,
    defaultLayout: `${__dirname}/views/index.hbs`,
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`
});

const alumnos = [
    {
        nombre: `alumno1`,
        apellido: `apellido1`
    },
    {
        nombre: `alumno2`,
        apellido: `apellido2`
    },
    {
        nombre: `alumno3`,
        apellido: `apellido3`
    }
]

app.engine(`hbs`, engineFn);
app.set(`views`, `./views`);
app.set(`view engine`, `hbs`);

app.get(``, (req, res) => {
    const data = {
        comision: 30975,
        alumnos
    }; 
    return res.render(`layouts/main`, data);
})

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP corriendo en puerto ${PORT}`);
});

server.on(`error`, error => console.log(`error en el servidor ${error}`));