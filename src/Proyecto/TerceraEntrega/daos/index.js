const ProductosDAOMongoDB = require(`../daos/productos/ProductosDAOMongoDB`);
const CarritoDAOMongoDB = require(`../daos/carritos/CarritoDAOMongoDB`);

const getStorage = () => {
    //const storage = process.env.STORAGE;
    const storage = `MongoDb`; //Prueba: forzar variable para trabajar con la DB deseada.

    switch (storage) {

        case `MongoDB`:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB()
            }
            break

        default:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB()
            }
            break
    }
}

module.exports = getStorage;