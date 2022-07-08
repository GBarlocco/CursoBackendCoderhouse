let administrator = true;

const storage = require(`../daos/index`);

const productsStorage = storage().productos;

const addProduct = async (req, res) => {
    if (administrator) {
        try {
            const name = req.body.nombre;
            const price = Number(req.body.precio);
            const url = req.body.thumbnail;
            const description = req.body.descripcion;
            const date = new Date().toDateString();
            const code = Number(req.body.codigo);
            const stock = Number(req.body.stock);

            const newProducto = {
                timestamp: date,
                nombre: `${name}`,
                descripcion: `${description}`,
                codigo: code,
                thumbnail: `${url}`,
                precio: price,
                stock: stock
            };
            const id = await productsStorage.save(newProducto);

            return res.json(`Se agregó el nuevo producto`);
        } catch (err) {
            return res.status(404).json({
                error: `Error al crear un producto ${err}`
            });
        }
    } else {
        return res.status(404).json({
            error: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
}

const getAllProducts = async (req, res) => {
    try {
        let allProducts = await productsStorage.getAll();
        return res.json(allProducts);
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener todos los productos${err}`
        });
    }
}

const getProductById = async (req, res) => {
    try {
        let idCart = req.params.id;
        let productbyId = await productsStorage.getById(idCart);

        if (!productbyId) {
            return res.status(404).json({
                error: `Error producto no encontrado`
            });
        } else {
            return res.json(productbyId);
        }
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener el producto por id ${err}`
        });
    }
}

const updateProductById = async (req, res) => {
    if (administrator) {
        try {
            const idProduct = req.params.id;
            const name = req.body.nombre;
            const price = Number(req.body.precio);
            const url = req.body.thumbnail;
            const description = req.body.descripcion;
            const date = new Date().toDateString();
            const code = Number(req.body.codigo);
            const stock = Number(req.body.stock);

            await productsStorage.updateById(idProduct, name, price, url, description, date, code, stock);

            return res.json(`Se actualizó el producto `);
        } catch (err) {
            return res.status(404).json({
                error: `Error al actualizar un producto ${err}`
            });
        }
    } else {
        return res.status(404).json({
            error: `Ruta no permitida, no es usuario con perfil administrador.`
        });
    }
}

const deleteProductById = async (req, res) => {
    if (administrator) {
        try {
            const id = req.params.id;
            await productsStorage.deleteById(id);
            return res.json(`Se eliminó de forma correcta el ID:${id}`);
        } catch (err) {
            return res.status(404).json({
                error: `Error al borrar un producto por id ${err}`
            });
        }
    } else {
        return res.status(404).json({
            error: `Ruta no permitida, no es usuario con perfil administrador.`
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

