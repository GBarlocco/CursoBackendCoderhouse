const { options } = require(`../db/mysql`);
const knex = require(`knex`)(options);

; (async () => {
    try {
        const products = await knex
            .from(`products`)
            .del();
        console.log(`Productos eliminados: ${products}`);
    } catch (err) {
        console.log(`Error ${err}`);
    } finally {
        await knex.destroy();
    }
})();