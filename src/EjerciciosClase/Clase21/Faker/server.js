// run app: nodemon server.js

const express = require(`express`);
const faker = require(`faker`);

faker.locale = 'es';

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

app.get(`/test`, (req, res) => {
    return res.json(random());
});

const random = () => {
    let resultado = [];

    for (let i = 0; i < 10; i++) {
        resultado.push({
            nombre: faker.name.firstName(),
            apellido: faker.name.lastName(),
            color: faker.commerce.color()
        });
    }

    return resultado;
}