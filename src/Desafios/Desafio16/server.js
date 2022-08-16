const express = require(`express`);
const { Server: HttpServer } = require(`http`);
const { Server: IOServer } = require(`socket.io`);

const MessageDAOMongoDB = require(`./daos/MessageDAOMongoDB`);

const MongoStore = require(`connect-mongo`);

const passport = require('passport');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static(`./public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const session = require('express-session');

const parseArgs = require(`minimist`);

const log4js = require('./utils/logs');

const dotenv = require(`dotenv`);
dotenv.config();

const login = require(`./authentication/login`);
const signup = require(`./authentication/signup`);
const serializeUser = require(`./authentication/serializeUser`);
const deserializeUser = require(`./authentication/deserializeUser`);

app.set(`views`, `./views`);
app.set(`view engine`, `ejs`);

const socketIoChat = require(`./sockets/socketChat`);
const socketIoProducts = require(`./sockets/socketProducts`);

const args = parseArgs(process.argv.slice(2));

const loggerConsole = log4js.getLogger(`default`);
const loggerArchiveWarn = log4js.getLogger(`warnArchive`);
const loggerArchiveError = log4js.getLogger(`errorArchive`);


// Servidor: modo CLUSTER / FORK
//nodemon server --> ejecuta en puerto 8080
//nodemon server -p xxxx --> ejecuta en puerto xxxx

const cluster = require(`cluster`);
const numCPUs = require(`os`).cpus().length;

const CLUSTER = args.CLUSTER;

const PORT = args.p || 8080;
const runServer = (PORT) => {
    httpServer.listen(PORT, () => loggerConsole.debug(`Servidor escuchando el puerto ${PORT}`));
}

if (CLUSTER) {
    if (cluster.isMaster) {

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on(`exit`, (worker, code, signal) => {
            cluster.fork();
        });

    } else {
        runServer(PORT);
    }

} else {
    runServer(PORT);
}

//Middlewares
app.use((req, res, next) => {
    loggerConsole.info(`
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);
    next();
});

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost:27017/desafio13",
        ttl: 10,
    }),
    secret: '123456',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));

app.use(passport.initialize());
app.use(passport.session());


//Authentication
login();
signup();
serializeUser();
deserializeUser();

//Instancia contenedores:
const storageMessages = new MessageDAOMongoDB();

//Routers import
const homeRouter = require(`./routers/homeRouter`);
const formRouter = require(`./routers/formRouter`);
const loginRouterGet = require(`./routers/loginRouterGet`);
const loginRouterPost = require(`./routers/loginRouterPost`);
const chatRouter = require(`./routers/chatRouter`);
const fakerRouter = require(`./routers/fakerRouter`);
const infoRouter = require(`./routers/infoRouter`);
const infoRouterCompression = require(`./routers/infoRouterCompression`);
const objectRandomRouterGET = require(`./routers/objectRandomGETRouter`);
const objectRandomRouterPOST = require(`./routers/objectRandomPOSTRouter`);
const objectRandomRouterOUT = require(`./routers/objectRandomOUTRouter`);
const login2RouterGet = require(`./routers/login2RouterGet`);
const signup2Router = require(`./routers/signup2Router`);
const bienvenidaRouter = require(`./routers/bienvenidaRouter`);
const errorLogRouter = require(`./routers/errorLogRouter`);
const errorSignupRouter = require(`./routers/errorSignupRouter`);
const logoutRouter = require(`./routers/logoutRouter`);

//Routers
app.use(`/`, homeRouter);
app.use(`/form`, formRouter);
app.use(`/login`, loginRouterGet);
app.use(`/login`, loginRouterPost);
app.use(`/chat`, chatRouter);
app.use(`/api/productos-test`, fakerRouter);
app.use(`/info`, infoRouter);
app.use(`/infoCompression`, infoRouterCompression);
app.use(`/api/randoms`, objectRandomRouterGET);
app.use(`/api/randoms`, objectRandomRouterPOST);
app.use(`/objectRandomOUT`, objectRandomRouterOUT);
app.use(`/login2`, login2RouterGet);
app.use(`/signup2`, signup2Router);
app.use(`/bienvenida`, bienvenidaRouter);
app.use(`/errorLog`, errorLogRouter);
app.use(`/errorSignup`, errorSignupRouter);
app.use(`/logout`, logoutRouter);
app.post('/login2', passport.authenticate('login', { //indicamos el controlador de passport, llega desde el formulario de login.
    successRedirect: '/bienvenida', //redirect es con método get, vamos a home.
    failureRedirect: `/errorLog`, // redirect es con método get, vamos a /login de get.
    failureFlash: true  // nos permite enviar mensajes.
}));
app.post('/signup2', passport.authenticate('signup', {//indicamos el controlador de passport, llega desde el formulario de signup.
    successRedirect: '/', // redirect es con método get, vamos a home.
    failureRedirect: `/errorSignup`, // redirect es con método get, vamos a /signup de signup.
    failureFlash: true // nos permite enviar mensajes.
}));

//Socket products:
socketIoChat(io);

//Socket chat:
socketIoProducts(io);

//Middlewares
app.use((req, res, next) => {
    loggerConsole.warn(`
    Estado: 404
    Ruta consultada: ${req.originalUrl}
    Metodo ${req.method}`);

    loggerArchiveWarn.warn(`Estado: 404, Ruta consultada: ${req.originalUrl}, Metodo ${req.method}`);

    res.status(404).json({ error: -2, descripcion: `ruta ${req.originalUrl} metodo ${req.method} no implementada` });
    next();
});