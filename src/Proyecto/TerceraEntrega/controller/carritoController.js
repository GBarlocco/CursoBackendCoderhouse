const storage = require(`../daos/index`);
const UserModel = require(`../dataBase/models/user`);

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


/*
const addProduct = async (req, res) => {
    let idUser = req.body.idUser;
    let product = req.body.product;

    let hardCodeProduct = {
        _id: 1,
        nombre: "Producto 2",
        descripcion: "descripción del nuevo producto",
        codigo: 2,
        thumbnail: "url2",
        precio: 2,
        stock: 2
    }
};
*/

// 
/*
const addProduct = async (req, res) => {
    try {
        let idCart = req.params.idCar;
        let idProduct = req.params.idProd;

        await productsStorage.addProduct(idCart, idProduct);

        return res.json(`Se agregó el producto con id ${idProduct} al carrito con id ${idCart}`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al agregar un producto ${err}`
        });
    }
};
*/

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
        const idCart = req.params.id;
        const idProduct = req.params.id_prod;

        await productsStorage.deleteProductById(idCart, idProduct);

        return res.json(`Producto  con ID: ${idProduct} del carrito con ID ${idCart} fue eliminado`);
    } catch (err) {
        return res.status(404).json({
            error: `Error al eliminar un producto específico de un carrito ${err}`
        });
    }
};

const viewCart = (req, res) => {
    //userCarrito = req.user.carrito;
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