const { SQLite3Contenedor } = require(`./Contenedor`);

selectAllMessage = async () => {
    try {
        // SELECT * FROM messages
        let allMessages = await SQLite3Contenedor.getKnex()
            .select(`*`)
            .from(`messages`);

        console.table(allMessages);

        return allMessages;

    } catch (err) {
        console.log(`Error ${err}`);
    }
};
selectAllMessage();
module.exports = {
    selectAllMessage
}