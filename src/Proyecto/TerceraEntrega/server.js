const express = require(`express`);
const app = express();
const passport = require('passport');
const log4js = require('./utils/logs');
const MongoStore = require(`connect-mongo`);
const dotenv = require(`dotenv`);
dotenv.config();

app.use(express.static(__dirname + `./public/avatar`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');

//Middleware: session
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGO,
        ttl: 10,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));
app.use(passport.initialize());
app.use(passport.session());

//Views
app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

//Middlewares
const loggerConsole = log4js.getLogger(`default`)

app.use((req, res, next) => {
    loggerConsole.info(`
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);
    next();
});

//My middleware
const isLogged = ((req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.render('errorAccesoDenegado')
    }
});

//Routers import
const productosRouter = require(`./routes/productosRouter`);
const carritoRouter = require(`./routes/carritoRouter`);
const { loginRouter } = require(`./routes/userRouter`);
const { signupRouter } = require(`./routes/userRouter`);
const { logoutRouter } = require(`./routes/userRouter`);
const { profileRouter } = require(`./routes/userRouter`);
const generalViewsRouter = require(`./routes/generalViewsRouter`);

//Routers
app.use(`/`, generalViewsRouter);
app.use(`/api/productos`, productosRouter);
app.use(`/api/carrito`, carritoRouter);
app.use(`/login`, loginRouter);
app.use(`/signup`, signupRouter);
app.use('/logout', logoutRouter);
app.use(`/profile`, profileRouter);

app.use((req, res) => {
    res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` });
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => console.log(`Servidor HHTP escuchando puerto ${PORT}`));

server.on(`error`, err => console.log(`error en el servidor ${err}`));


