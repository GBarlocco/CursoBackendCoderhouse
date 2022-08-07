const dotenv = require(`dotenv`);
dotenv.config();

const optionsSQLite3 = {
    client: process.env.CLIENT_SQLITE3,
    connection: { filename: process.env.FILNMAE_SQLITE3 }
};

module.exports = {
    optionsSQLite3
};