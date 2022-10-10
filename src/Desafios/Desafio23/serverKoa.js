const Koa = require(`koa`);
const appKoa = new Koa();

const log4js = require('./utils/logs');

const dotenv = require(`dotenv`);
const parseArgs = require(`minimist`);

dotenv.config();

const args = parseArgs(process.argv.slice(2));

//Middlewares
const loggerConsole = log4js.getLogger(`default`);


//Routers import
const productosRouter = require(`./routes/productosRouter`);
const generalViewsRouter = require(`./routes/generalViewsRouter`);
const ordenesRouter = require(`./routes/ordenesRouter`);

//Routers

//En Koa no se utiliza res, req, utilizamos un unico objecto context --> ctx
appKoa.use(generalViewsRouter.routes());
appKoa.use(productosRouter.routes());
appKoa.use(ordenesRouter.routes());


const CLUSTER = args.CLUSTER;

const PORT = process.env.PORT || 8080;

const runServer = (PORT) => {
    appKoa.listen(PORT, () => loggerConsole.debug(`Servidor escuchando el puerto ${PORT}`));
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