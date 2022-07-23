const express = require(`express`);
const session = require(`express-session`);
const FileStore = require(`session-file-store`)(session);

//Creamos aplicación de express
const app = express();

//inyectamos el middleware de session
app.use(session({
    //Persistencia en archivo:
    store: new FileStore({
        path: `./sesiones`,
        ttl: 60 //tiempo de vida de la session = 60s
    }),
    secret: `1234`,
    resave: true,
    saveUninitialized: true
}));

app.get(`/session`, (req, res) => {
    if (req.session.contador) {
        req.session.contador++;
        return res.send(`has visitado ${req.session.contador} veces el sitio`);
    }
    req.session.contador = 1;
    return res.send(`Bienvenido`);
});

app.get(`/logout`, (req, res) => {
    return req.session.destroy(err => {
        if (!err) {
            return res.send({ logout: true });
        }
        return res.send({ error: err });
    })
});

app.get(`/test`, (req, res) => {
    console.log(req.session.contador);

    return res.send(`ok`);
})

const PORT = 8080;

app.listen(PORT, () => console.log(`servidor corriendo en el puerto ${PORT}`));