const storage = require(`../daos/index`);

const productsStorage = storage().productos;

const addProduct = async ctx => {
    try {
        const name = ctx.body.nombre;
        const price = Number(ctx.body.precio);
        const url = ctx.body.thumbnail;
        const description = ctx.body.descripcion;
        const date = new Date().toDateString();
        const code = Number(ctx.body.codigo);
        const stock = Number(ctx.body.stock);

        const newProducto = {
            timestamp: date,
            nombre: `${name}`,
            descripcion: `${description}`,
            codigo: code,
            thumbnail: `${url}`,
            precio: price,
            stock: stock,
            cantidad: 0
        };
        const id = await productsStorage.save(newProducto);

        ctx.body = {
            status: `success`,
            message: `Producto agregado`,
        }

    } catch (err) {
        ctx.body = {
            status: `Error`,
            message: `Error al crear un producto ${err}`
        }
    }
}

const getAllProducts = async ctx => {
    try {
        const allProducts = await productsStorage.getAll();

        ctx.body = {
            status: `success`,
            message: allProducts,
        }
    } catch (err) {
        return res.status(404).json({
            error: `Error al obtener todos los productos${err}`
        });
    }
}

const getProductById = async ctx => {
    try {
        const idCart = ctx.params.id;
        const productbyId = await productsStorage.getById(idCart);

        if (!productbyId) {

            ctx.body = {
                status: `Error`,
                message: `Error producto no encontrado`,
            }

        } else {
            ctx.body = {
                status: `Ok`,
                message: productbyId,
            }
        }
    } catch (err) {
        ctx.body = {
            status: `Error`,
            message: `Error al obtener el producto por id ${err}`,
        }
    }
}

const updateProductById = async ctx => {
    try {
        const idProduct = ctx.params.id;
        const name = ctx.body.nombre;
        const price = Number(ctx.body.precio);
        const url = ctx.body.thumbnail;
        const description = ctx.body.descripcion;
        const date = new Date().toDateString();
        const code = Number(ctx.body.codigo);
        const stock = Number(ctx.body.stock);

        await productsStorage.updateById(idProduct, name, price, url, description, date, code, stock);

        ctx.body = {
            status: `success`,
            message: `Se actualizó el producto`,
        }
    } catch (err) {

        ctx.body = {
            status: `Error`,
            message: `Error al actualizar un producto ${err}`,
        }
    }
}


const deleteProductById = async ctx => {
    if (userLog.admin) {
        try {
            const id = ctx.params.id;
            await productsStorage.deleteById(id);

            ctx.body = {
                status: `success`,
                message: `Se eliminó de forma correcta el ID:${id}`,
            }

        } catch (err) {
            return res.status(404).json({
                error: `Error al borrar un producto por id ${err}`
            });
        }
    } else {

        ctx.body = {
            status: `Error`,
            message: `Error al actualizar un producto ${err}`,
        }
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
};

