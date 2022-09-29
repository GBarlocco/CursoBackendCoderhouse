/*
    NOTA:
        -Se deja la lógica en el programa, en este entregable se decidió generar el carrito en el usuario.
        -Se agregaron las ordenes
*/

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

