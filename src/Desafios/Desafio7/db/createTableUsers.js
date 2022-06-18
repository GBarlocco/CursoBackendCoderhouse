const { SQLite3Contenedor } = require(`./Contenedor`);

; (async () => {
    try {
        const productsTable = await SQLite3Contenedor.getKnex().schema
            .createTable(`users`, table => {
                table.increments(`id`);
                table.string(`userName`, 10);
                table.string(`avatar`, 50);
            });
        console.log(`Tabla de users creada`);
    } catch (err) {
        console.log(`Error: ${err}`);
    }
})();