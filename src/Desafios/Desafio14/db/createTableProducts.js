const { mySQLContenedor } = require(`./Contenedor`);

; (async () => {
    try {
        const productsTable = await mySQLContenedor.getKnex().schema
            .createTable(`products`, table => {
                table.increments(`id`);
                table.string(`title`, 30);
                table.float(`price`);
                table.string(`thumbnail`, 255);
            });
        console.log(`Tabla de productos creada`);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
})();