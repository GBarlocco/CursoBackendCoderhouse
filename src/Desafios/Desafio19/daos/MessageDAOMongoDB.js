const mongoDB = require(`../db/options/mongoDB`);

const messageModel = require(`../db/models/message`);

const ContenedorMessage = require(`../db/contenedor/ContenedorMessage`);

class MessageDAOMongoDB extends ContenedorMessage {
    constructor() {
        super(mongoDB, messageModel);
    };
};

module.exports = MessageDAOMongoDB;