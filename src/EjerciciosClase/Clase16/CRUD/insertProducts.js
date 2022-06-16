// Elegimos uno de los 2: con este simple cambio logramos que el script apunte a una u otra DB.
//const { options } = require(`../db/mysql`);
const { options } = require(`../db/sqlite`);

const knex = require(`knex`)(options);

const products = [
    {
        name: `Producto1`,
        price: 10,
        description: `descripción producto1`,
        stock: 10,
        category_id: 1
    },
    {
        name: `Producto2`,
        price: 20,
        description: `descripción producto2`,
        stock: 20,
        category_id: 2
    },
    {
        name: `Producto3`,
        price: 30,
        description: `descripción producto3`,
        stock: 30,
        category_id: 1
    },
    {
        name: `Producto4`,
        price: 40,
        description: `descripción producto4`,
        stock: 40,
        category_id: 2
    }
];

knex(`products`)
    .insert(products)
    .then(() => console.log(`Productos insertadas`))
    .catch(err => console.log(`Err ${err}`))
    .finally(() => knex.destroy());