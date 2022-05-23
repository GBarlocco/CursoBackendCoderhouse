const express = require(`express`);
const app = express();

app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const personas = [];

app.get(`/`, (req, res) => {
    const data = {
        comision: 30975
    }
    return res.render(`index`, data);
});

app.get(`/alumnos`, (req, res) => {
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
    ];

    const data = {
        alumnos,
        comision: 30975
    }
    return res.render(`alumnos`, data);
});

app.get(`/form`, (req, res) => {
    const data = {
        personas
    }
    return res.render(`form`, data);
});

app.post(`/personas`, (req, res) => {
    const persona = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad
    }
    personas.push(persona);

    return res.redirect(`/form`);
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP corriendo en puerto ${PORT}`);
});

server.on(`error`, error => console.log(`error en el servidor ${error}`));