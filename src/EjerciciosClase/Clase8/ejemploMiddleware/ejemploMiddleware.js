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

const middleWareRoot = (req, res, next) => {
    console.log(`Estoy en middleWareRoot`);
    return next();
};

app.use((req, res, next) => {
    console.log("primer ejecución");
    return next();
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: `Error en servidor`
    });
});


app.use(`/api/personas`, personasRouter);
app.use(`/api/mascotas`, mascotasRouter);
/*
mascotasRouter.use((req, res, next) => {
    console.log(`Request recibido al router de mascotas`);
    return next();
})
*/


personasRouter.get(``, (req, res) => {
    console.log("Estoy en getPersonas");
    return res.json(personas);
})

personasRouter.post(`/:nombre/:apellido/:edad`, (req, res) => {
    console.log("Estoy en postPersonas");
    const newPersona = {
        nombre: req.params.nombre,
        apellido: req.params.apellido,
        edad: Number(req.params.edad)
    };
    personas.push(newPersona);

    return res.json(`Persona agregada`);
});

mascotasRouter.get(``, (req, res) => {
    console.log("Estoy en getMascotas");
    return res.json(mascotas);
})

mascotasRouter.post(`/:nombre/:raza/:edad`, (req, res) => {
    console.log("Estoy en postMascotas");
    const newMascota = {
        nombre: req.params.nombre,
        raza: req.params.raza,
        edad: Number(req.params.edad)
    };
    mascotas.push(newMascota);

    return res.json(`Mascota agregada`);
});

app.get(`/`, middleWareRoot, (req, res) => {
    console.log("luego del middleware");
    return res.json({ status: `OK` });
})




