const express = require(`express`);
const app = express();

app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Contenedor = require(`../contenedor.js`);
let myContenedor = new Contenedor(`../productos.txt`);

app.get(`/`, (req, res) => {
    const data = {
        title: "Desafio Nº5 - Modelo MVC: Plantilla: Ejs",
        content: "En la web se podrán ingresar productos, ver productos. La plafatorma corresponde a un modelo MVC"
    }
    return res.render(`index`, data);
});

app.get(`/productos`, (req, res) => {
    let allProducts;
    ; (async () => {
        try {
            allProducts = await myContenedor.getAll();
        } catch (err) {
            return res.status(404).json({
                error: `Error ${err}`
            });
        }
        data = {
            allProducts,
        };
        return res.render(`verProductos`, data);
    })();
});

app.get(`/form`, (req, res) => {

    return res.render(`formProductos`);
});

app.post(`/productos`, (req, res) => {
    ; (async () => {
        const name = req.body.title;
        const price = Number(req.body.price);
        const url = req.body.thumbnail;

        const newProducto = {
            title: `${name}`,
            price: price,
            thumbnail: `${url}`
        };
        const id = await myContenedor.save(newProducto);
        return res.redirect(`/form`);
    })();
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP corriendo en puerto ${PORT}`);
});

server.on(`error`, error => console.log(`error en el servidor ${error}`));