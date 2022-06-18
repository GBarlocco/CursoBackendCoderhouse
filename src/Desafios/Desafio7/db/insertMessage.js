const { SQLite3Contenedor } = require(`./Contenedor`);

insertMessage = async (message) => {
    try {
        // INSERT INTO messages(id, text, email,time) VALUES (4, "hola mensaje 1", "barlocco@hotmail.es", "14:22");
        const insertMessage = await SQLite3Contenedor.getKnex()
            .into(`messages`)
            .insert(message);

    } catch (err) {
        console.log(`Error ${err}`);
    }
};

module.exports = {
    insertMessage
}