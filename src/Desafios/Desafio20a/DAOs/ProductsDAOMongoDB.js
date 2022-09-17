const mongoDB = require(`../db/options/mongoDB`);

const productsModel = require(`../db/models/products`);

const ContenedorProducts = require(`../db/contenedor/ContenedorProducts`);

class ProductsDAOMongoDB extends ContenedorProducts {
    constructor() {
        super(mongoDB, productsModel);
    };
};

module.exports = ProductsDAOMongoDB;