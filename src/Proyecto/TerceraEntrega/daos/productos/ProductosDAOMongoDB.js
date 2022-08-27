const mongoDB = require(`../../dataBase/options/mongoDB`);
const productsModel = require(`../../dataBase/models/producto`);

const CrudMongoDB = require(`../../dataBase/crudMongoDB/crudProductos`);

class ProductosDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, productsModel);
    };
};

module.exports = ProductosDAOMongoDB;