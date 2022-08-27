const mongoDB = require(`../../dataBase/options/mongoDB`);

const carritoModel = require(`../../dataBase/models/carrito`);
const productsModel = require(`../../dataBase/models/producto`);
const userModel = require(`../../dataBase/models/user`);

const CrudMongoDB = require(`../../dataBase/crudMongoDB/crudCarritos`);

class CarritoDAOMongoDB extends CrudMongoDB {
    constructor() {
        super(mongoDB, carritoModel, productsModel, userModel);
    };
};

module.exports = CarritoDAOMongoDB;