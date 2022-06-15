const { options } = require(`../db/mysql`);
const knex = require(`knex`)(options);

knex
    .from(`products`)
    .select(`name`, `category_id`, `stock`)
    .orderBy(`stock`, `desc`)
    .then((products) => {
        console.table(products);
    })
    .catch(err => console.log(`Error ${err}`))
    .finally(() => knex.destroy());