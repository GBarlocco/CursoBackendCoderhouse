const { options } = require(`../db/mysql`);
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