const { options } = require(`../db/mysql`);
const knex = require(`knex`)(options);

; (async () => {
    try {
        const allProducts = await knex
            .from(`products`)
            .select(`*`);

        console.table(allProducts);
    } catch (err) {
        console.log(`Error ${err}`);
    } finally {
        await knex.destroy();
    }
})();
