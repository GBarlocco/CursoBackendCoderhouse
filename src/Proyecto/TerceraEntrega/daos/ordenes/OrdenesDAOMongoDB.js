const mongoDB = require(`../../dataBase/options/mongoDB`);

const productsModel = require(`../../dataBase/models/producto`);
const userModel = require(`../../dataBase/models/user`);
const ordenModel = require(`../../dataBase/models/ordenes`);

const CrudMongoDB = require(`../../dataBase/crudMongoDB/crudOrdenes`);

class OrdenesDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel, userModel, ordenModel);
    };
};

module.exports = OrdenesDAOMongoDB;

