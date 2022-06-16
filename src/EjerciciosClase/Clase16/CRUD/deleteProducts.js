const { options } = require(`../db/mysql`);
const knex = require(`knex`)(options);

; (async () => {
    try {
        const products = await knex
            .from(`products`)
            .where(`id`, 5)
            .del();

        console.log(`Productos eliminados: ${products}`);
    } catch (err) {
        console.log(`Error ${err}`);
    } finally {
        await knex.destroy();
    }
})();