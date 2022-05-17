const express = require(`express`);
const { Router } = express;

const Contenedor = require(`../Desafio4/contenedor.js`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

const productosRouter = Router();
app.use(`/api/productos`, productosRouter);

app.use(express.static(`public`));

let myContenedor = new Contenedor(`productos.txt`);

productosRouter.get(``, (req, res) => {
    ; (async () => {
        try {
            let allProducts = await myContenedor.getAll();
            return res.json(allProducts);
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
    })();
});

productosRouter.get(`/:id`, (req, res) => {
    ; (async () => {
        try {
            let productbyId = await myContenedor.getById(req.params.id);
            if (productbyId.length == 0) {
                return res.status(404).json({
                    error: `Error producto no encontrado`
                });
            } else {
                return res.json(productbyId);
            }
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
    })();
});

productosRouter.post(``, (req, res) => {
    ; (async () => {
        const name = req.body.nombre;
        const price = Number(req.body.precio);
        const url = req.body.url;

        const newProducto = {
            title: `${name}`,
            price: price,
            thumbnail: `${url}`
        };
        const id = await myContenedor.save(newProducto);

        return res.json(`El id asignado es ${id}`);
    })();
});

productosRouter.put(`/:id`, (req, res) => {
    ; (async () => {
        const id = Number(req.params.id);
        let allProducts = await myContenedor.getAll();
        const productIndex = allProducts.findIndex(product => product.id === id);

        if (productIndex < 0) {
            return res.status(401).json({
                error: "producto no encontrado"
            });
        }

        allProducts[productIndex].title = req.body.title;
        allProducts[productIndex].price = req.body.price;
        allProducts[productIndex].thumbnail = req.body.thumbnail;

        await myContenedor.write(allProducts, `Mensaje modificado`);
        return res.json(`Se actualizó el id ${id}`);
    })();
});


productosRouter.delete(`/:id`, (req, res) => {
    ; (async () => {
        try {
            const id = Number(req.params.id);
            await myContenedor.deleteById(id);

            return res.json(`Se eliminó de forma correcta el ID:${id}`);
        } catch (err) {
            return res.status(404).json({
                error: `Se detecto un error --> ${err}`
            });
        }
    })();
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HHTP escuchando puerto ${PORT}`);
});

server.on(`error`, err => {
    console.log(`error en el servidor ${err}`);
});
