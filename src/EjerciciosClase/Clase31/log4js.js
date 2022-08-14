const log4js = require(`log4js`);

/*
    Para utilizar la librería Log4js tenemos que configurar 2 puntos:
        - appenders: tipos de logs, se pueden realizar logs por console y por archivos.
        - categories: agrupaciones de appenders que utilizaremos, y su respectivo nivel.

        6 tipos de salidas: Trace, Debug, Info, Warn, Error, Fatal. Dependiendo lo que se configure es lo que se imprimirá, entonces nos podremos preocupar por error y warms, no infos.

*/

log4js.configure({
    appenders: {
        miLoggerConsole: { type: "console" },
        miLoggerFile: { type: `file`, filename: `info.log` },
        miLoggerFile2: { type: `file`, filename: `info2.log` }
    },
    categories: {
        default: { appenders: [`miLoggerConsole`], level: `trace` },
        consola: { appenders: [`miLoggerConsole`], level: `debug` },
        archivo: { appenders: [`miLoggerFile`], level: `warn` },
        archivo2: { appenders: [`miLoggerFile2`], level: `info` },
        todos: { appenders: [`miLoggerConsole`, `miLoggerFile`], level: `error` }
    }
});

const logger = log4js.getLogger(`consola`);

logger.trace(`Log de trace`);
logger.debug(`Log de debug`);
logger.info(`Log de info`);
logger.warn(`Log de warn`);
logger.error(`Log de error`);
logger.fatal(`Log de fatal`);

const logger2 = log4js.getLogger(`archivo`);

logger2.trace(`Log2 de trace`);
logger2.debug(`Log2 de debug`);
logger2.info(`Log2 de info`);
logger2.warn(`Log2 de warn`);
logger2.error(`Log2 de error`);
logger2.fatal(`Log2 de fatal`);

const logger3 = log4js.getLogger(`todos`);

logger3.trace(`Log3 de trace`);
logger3.debug(`Log3 de debug`);
logger3.info(`Log3 de info`);
logger3.warn(`Log3 de warn`);
logger3.error(`Log3 de error`);
logger3.fatal(`Log3 de fatal`);
