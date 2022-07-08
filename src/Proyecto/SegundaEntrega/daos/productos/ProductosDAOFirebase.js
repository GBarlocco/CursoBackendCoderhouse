const { queryProductos } = require(`../../dataBase/options/firebaseDB`);
const CrudFirebase = require(`../../dataBase/crudFirebase/crudProductos`);

class ProductosDAOFirebase extends CrudFirebase {
    constructor() {
        super(queryProductos);
    };
};

module.exports = ProductosDAOFirebase;