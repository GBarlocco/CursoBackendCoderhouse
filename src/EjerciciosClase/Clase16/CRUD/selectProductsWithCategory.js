// Elegimos uno de los 2: con este simple cambio logramos que el script apunte a una u otra DB.
//const { options } = require(`../db/mysql`);
const { options } = require(`../db/sqlite`);

const knex = require(`knex`)(options);

; (async () => {
    try {
        const products = await knex
            .from(`products`)
            .select(`products.*`, `categories.name as category_Name`)
            .join('categories', { 'products.category_id': 'categories.id' });
        console.table(products);
    } catch (err) {
        console.log(`Error ${err}`);
    } finally {
        await knex.destroy();
    }
})();