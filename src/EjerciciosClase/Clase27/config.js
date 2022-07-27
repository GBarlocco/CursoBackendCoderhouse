const config = {
    env: process.env.NODE_ENV || `dev`,
    host: process.env.HOST || `127.0.0.1`,
    port: process.env.PORT || 3000
};

module.exports = config;