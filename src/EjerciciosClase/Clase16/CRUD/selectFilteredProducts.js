const { options } = require(`../db/mysql`);
const knex = require(`knex`)(options);

knex
    .from(`products`)
    .select(`name`, `price`)
    .where(`price`, `>=`, 30)
    .then((products) => {
        console.table(products);
    })
    .catch(err => console.log(`Error ${err}`))
    .finally(() => knex.destroy());