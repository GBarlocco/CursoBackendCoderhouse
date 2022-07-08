/*
Desarrollar un servidor basado en Node.js y express que para la ruta `/test` responda con un array de 10 objetos, con el siguiente formato:
{
    nombre: ``,
    apellido: ``,
    color: ``
}

Los objetos generados tendrán un valor aleatorio para cada uno de sus campos. El valor será obtenido de los siguientes arrays:
const nombres = [`Luis`, `Lucía`, `Juan`, `Augusto`, `Ana`]
const apellidos = [`Pieres`, `Cacurri`, `Bezzola`, `Alberca`, `Mei`]
const colores = [`rojo`, `verde`, `azul`, `amarillo`, `magenta`]

Con cada request se obtendrán valores diferentes.
*/

// run app: nodemon server.js

const express = require(`express`);

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

const randomMath = (arr) => {
    return Math.floor(Math.random() * arr.length)
}

const random = () => {
    const nombres = [`Luis`, `Lucía`, `Juan`, `Augusto`, `Ana`];
    const apellidos = [`Pieres`, `Cacurri`, `Bezzola`, `Alberca`, `Mei`];
    const colores = [`rojo`, `verde`, `azul`, `amarillo`, `magenta`];

    let resultado = [];

    for (let i = 0; i < 10; i++) {

        let returnNombre = nombres[randomMath(nombres)];
        let returnApellidos = apellidos[randomMath(apellidos)];
        let returnColores = colores[randomMath(colores)];

        resultado.push({
            nombre: returnNombre,
            apellido: returnApellidos,
            color: returnColores
        })

    }
    return resultado;
}