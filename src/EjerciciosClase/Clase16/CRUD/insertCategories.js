// Elegimos uno de los 2: con este simple cambio logramos que el script apunte a una u otra DB.
//const { options } = require(`../db/mysql`);
const { options } = require(`../db/sqlite`);

const knex = require(`knex`)(options);

const categories = [
    {
        name: `Categoria1`
    },
    {
        name: `Categoria2`
    },
    {
        name: `Categoria3`
    },
    {
        name: `Categoria4`
    }
];

knex(`categories`)
    .insert(categories)
    .then(() => console.log(`Categorias insertadas`))
    .catch(err => console.log(`Err ${err}`))
    .finally(() => knex.destroy());