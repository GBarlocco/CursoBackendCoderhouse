const { options } = require(`../db/mysql`);
const knex = require(`knex`)(options);

; (async () => {
    try {
        const updateProduct = await knex
            .from(`products`)
            .where(`stock`, `=`, 10)
            .update({ stock: 11 });

        console.log(`productos actualizados: ${updateProduct}`)
    } catch (err) {
        console.log(`Error ${err}`);
    } finally {
        await knex.destroy();
    }
})();