const express = require(`express`);
const { Router } = express; // const Router = express.Router

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HHTP escuchando puerto ${PORT}`);
});

server.on(`error`, err => {
    console.log(`error en el servidor ${err}`);
});

const personas = [];
const mascotas = [];

const personasRouter = Router();
const mascotasRouter = Router();

app.use(`/api/personas`, personasRouter);
app.use(`/api/mascotas`, mascotasRouter);

personasRouter.get(``, (req, res) => {
    return res.json(personas);
})

personasRouter.post(`/:nombre/:apellido/:edad`, (req, res) => {

    const newPersona = {
        nombre: req.params.nombre,
        apellido: req.params.apellido,
        edad: Number(req.params.edad)
    };
    personas.push(newPersona);

    return res.json(`Persona agregada`);
});

mascotasRouter.get(``, (req, res) => {
    return res.json(mascotas);
})

mascotasRouter.post(`/:nombre/:raza/:edad`, (req, res) => {

    const newMascota = {
        nombre: req.params.nombre,
        raza: req.params.raza,
        edad: Number(req.params.edad)
    };
    mascotas.push(newMascota);

    return res.json(`Mascota agregada`);
});



