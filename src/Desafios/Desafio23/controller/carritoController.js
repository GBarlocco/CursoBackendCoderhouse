/*
    NOTA:
        -Se deja la lógica en el programa, en este entregable se decidió generar el carrito en el usuario.
        -Se agregaron las ordenes
*/

const storage = require(`../daos/index`);

const productsStorage = storage().carrito;

const getAllProductsByIdCart = async (req, res) => {
    try {
        let idCart = req.params.id;
        let productsbyId = await productsStorage.getProductsByID(idCart);

        if (productsbyId.length == 0) {
            return res.json(`El carrito se encuentra vacío`);
        } else {
            return res.json(productsbyId);
        }
    } catch (err) {
        return res.status(404).json({
            error: `Error al intentar acceder a un id de producto contenido en un carrito ${err}`
        });
    }
};

const createCart = async (req, res, next) => {
    try {
        userLog = req.user;
        const cart = await productsStorage.createCart();
        return res.redirect(`/api/productos`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al crear el carrito ${err}`
        });
    }
};

const addProductToCart = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const idProduct = req.body.idProduct;

        await productsStorage.addProduct(idUser, idProduct);

        return res.redirect(`/api/productos`)
    } catch (err) {
        return res.status(404).json({
            error: `Error al agregar un producto ${err}`
        });
    }
};


const deleteCartById = async (req, res) => {
    try {
        const idCart = req.params.id;

        await productsStorage.deleteCartById(idCart);
        return res.json(`Se eliminó el carrito de forma correcta`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al eliminar el carrito ${err}`
        });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const idUser = req.body.idUser;
        const idProduct = req.body.idProduct;

        await productsStorage.deleteProductById(idUser, idProduct);

        return res.redirect(`/api/carrito`)
    } catch (err) {
        return res.status(404).json({
            error: `Error al eliminar un producto específico de un carrito ${err}`
        });
    }
};

const viewCart = (req, res) => {
    userLog = req.user;
    return res.render(`carrito`, { userLog });
}

module.exports = {
    getAllProductsByIdCart,
    createCart,
    addProductToCart,
    deleteCartById,
    deleteProductById,
    viewCart,
};