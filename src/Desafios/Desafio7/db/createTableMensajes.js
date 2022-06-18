const { SQLite3Contenedor } = require(`./Contenedor`);

; (async () => {
    try {
        const productsTable = await SQLite3Contenedor.getKnex().schema
            .createTable(`messages`, table => {
                table.increments(`id`);
                table.string(`text`, 500);
                table.integer(`usersId`).unsigned().references(`users.id`);
            });
        console.log(`Tabla de messages creada`);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
})();