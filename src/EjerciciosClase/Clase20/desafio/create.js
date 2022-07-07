const db = require(`./db`);
const userModel = require(`./userModel`);


const usuarios = [
    {
        nombre: 'Lucas',
        apellido: 'Blanco',
        dni: '30355874',
    },
    {
        nombre: 'María',
        apellido: 'García',
        dni: '29575148',
    },
    {
        nombre: 'Tomas',
        apellido: 'Sierra',
        dni: '38654790',
    },
    {
        nombre: 'Carlos',
        apellido: 'Fernández',
        dni: '26935670',
    }
];

db
    .then(_ => userModel.insertMany(usuarios))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => process.exit());
