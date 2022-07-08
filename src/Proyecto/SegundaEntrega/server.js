const express = require(`express`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`public`));

//Routers import
const productosRouter = require("./routes/productosRouter");
const carritoRouter = require("./routes/carritoRouter");

//Routers
app.use(`/api/productos`, productosRouter);
app.use(`/api/carrito`, carritoRouter);

app.use(express.static(`public`));

app.use((req, res, next) => {
    res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Servidor HHTP escuchando puerto ${PORT}`));

server.on(`error`, err => console.log(`error en el servidor ${err}`));


