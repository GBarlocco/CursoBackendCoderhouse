const { queryCarritos, queryProductos, FieldValue } = require(`../../dataBase/options/firebaseDB`);
const CrudFirebase = require(`../../dataBase/crudFirebase/crudCarritos`);

class CarritoDAOFirebase extends CrudFirebase {
    constructor() {
        super(queryCarritos, queryProductos, FieldValue);
    };
};

module.exports = CarritoDAOFirebase;