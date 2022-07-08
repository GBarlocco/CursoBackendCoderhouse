const express = require(`express`);
const usuariosRouter = require(`./routers/usuarios`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', usuariosRouter)

const PORT = 8080;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));