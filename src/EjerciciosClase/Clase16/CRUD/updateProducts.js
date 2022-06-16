// Elegimos uno de los 2: con este simple cambio logramos que el script apunte a una u otra DB.
//const { options } = require(`../db/mysql`);
const { options } = require(`../db/sqlite`);

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