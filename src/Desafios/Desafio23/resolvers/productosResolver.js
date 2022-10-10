const storage = require(`../daos/index`);

const productsStorage = storage().productos;


const addProduct = ({ data }) => {

}

const getAllProducts = async () => {
    try {
        const allProducts = await productsStorage.getAll();
        return allProducts;
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener todos los productos${err}`
        });
    }
}

const getProductById = async ({ id }) => {
    try {
        const productbyId = await productsStorage.getById(id);

        if (!productbyId) {
            return res.status(404).json({
                error: `Error producto no encontrado`
            });
        } else {
            return productbyId;
        }
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener el producto por id ${err}`
        });
    }
}

const updateProductById = async ({ id, data }) => {
    try {
        const idProduct = id;
        const name = data.nombre;
        const price = Number(data.precio);
        const url = data.thumbnail;
        const description = data.descripcion;
        const date = new Date().toDateString();
        const code = Number(data.codigo);
        const stock = Number(data.stock);

        const productUpdate = await productsStorage.updateById(idProduct, name, price, url, description, date, code, stock);

        return productUpdate;
    } catch (err) {
        return res.status(404).json({
            error: `Error al actualizar un producto ${err}`
        });
    }
}

const deleteProductById = async ({ id }) => {
    try {
        await productsStorage.deleteById(id);
        return id;
    } catch (err) {
        return res.status(404).json({
            error: `Error al borrar un producto por id ${err}`
        });
    }


}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
};

