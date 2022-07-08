const mongoDB = require(`../../dataBase/options/mongoDB`);

const carritoModel = require(`../../dataBase/models/carrito`);
const productsModel = require(`../../dataBase/models/producto`);

const CrudMongoDB = require(`../../dataBase/crudMongoDB/crudCarritos`);

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, carritoModel, productsModel);
    };
};

module.exports = CarritoDAOMongoDB;