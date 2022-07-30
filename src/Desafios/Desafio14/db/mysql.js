const dotenv = require(`dotenv`);
dotenv.config();

const optionsMySQL = {
    client: `mysql`,
    connection: {
        host: process.env.HOST_MYSQL,
        user: process.env.USER_MYSQL,
        password: process.env.PASSWORD_MYSQL,
        database: process.env.DATABASE_MYSQL
    }
};

module.exports = {
    optionsMySQL
};