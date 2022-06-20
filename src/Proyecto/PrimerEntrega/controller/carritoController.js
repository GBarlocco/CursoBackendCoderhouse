const CrudCarritos = require(`../dataBase/crudCarritos`);
const CrudProductos = require(`../dataBase/crudProductos`);

let myCrudCarritos = new CrudCarritos(`./dataBase/carritos.txt`);
let myCrudProductos = new CrudProductos(`./database/productos.txt`);

const getAllProductsByIdCart = async (req, res) => {
    try {
        let idCart = req.params.id;
        let productsbyId = await myCrudCarritos.getProductsByID(idCart);
        if (productsbyId.length == 0) {
            return res.json(`El carrito se encuentra vacío`);
        } else {
            return res.json(productsbyId);
        }
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
};

const createCart = async (req, res) => {
    try {
        const id = await myCrudCarritos.createCart();
        return res.json(`Nuevo carrito asignado, ID: ${id}`);
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
};

const addProduct = async (req, res) => {
    try {
        let idCart = Number(req.params.idCar);
        let idProduct = req.params.idProd;

        let allCarts = await myCrudCarritos.getAll();

        const cartIndex = allCarts.findIndex(cart => cart.id === idCart);

        if (cartIndex < 0) {
            return res.status(401).json({
                error: "carrito no encontrado"
            });
        };

        let cart = await myCrudCarritos.getCartById(idCart);

        if (cart.length == 0) {
            return res.status(404).json({
                error: `Error no se encontro el carrito`
            });
        };

        let productbyId = await myCrudProductos.getById(idProduct);

        if (productbyId.length == 0) {
            return res.status(404).json({
                error: `Error producto no encontrado`
            });
        };

        allCarts[cartIndex].products.push(productbyId[0]);

        await myCrudCarritos.write(allCarts, `producto agregado al carrito`);
        return res.json(`Se agregó el producto con id ${idProduct} al carrito con id ${idCart}`);

    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
};

const deleteCartById = async (req, res) => {
    try {
        const idCart = Number(req.params.id);

        await myCrudCarritos.deleteCartById(idCart);
        return res.json(`Se eliminó de forma correcta el carrito con ID:${idCart}`);
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const idCart = Number(req.params.id);
        const idProduct = Number(req.params.id_prod);

        await myCrudCarritos.deleteProductById(idCart, idProduct);

        return res.json(`Producto  con ID: ${idProduct} del carrito con ID ${idCart} fue eliminado`);
    } catch (err) {
        return res.status(404).json({
            error: `Error ${err}`
        });
    }
};

module.exports = {
    getAllProductsByIdCart,
    createCart,
    addProduct,
    deleteCartById,
    deleteProductById
};