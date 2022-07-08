const ProductosDAOFirebase = require('../daos/productos/ProductosDAOFirebase');
const CarritoDAOFirebase = require(`../daos/carritos/CarritoDAOFirebase`);

const ProductosDAOMongoDB = require(`../daos/productos/ProductosDAOMongoDB`);
const CarritoDAOMongoDB = require(`../daos/carritos/CarritoDAOMongoDB`);

const ProductosDAOArchivo = require(`../daos/productos/ProductosDAOArchivo`);
const CarritoDAOArchivo = require(`../daos/carritos/CarritoDAOArchivo`);

const getStorage = () => {
    //const storage = process.env.STORAGE;
    const storage = `firebase`; //Prueba: forzar variable para trabajar con la DB deseada.

    switch (storage) {
        case `firebase`:
            return {
                productos: new ProductosDAOFirebase(),
                carrito: new CarritoDAOFirebase()
            }
            break
        case `MongoDB`:
            return {
                productos: new ProductosDAOMongoDB(),
                carrito: new CarritoDAOMongoDB()
            }
            break
        case `archivo`:
            return {
                productos: new ProductosDAOArchivo(),
                carrito: new CarritoDAOArchivo()
            }
            break
        default:
            return {
                productos: new ProductosDAOFirebase(),
                carrito: new CarritoDAOFirebase()
            }
            break
    }
}

module.exports = getStorage;