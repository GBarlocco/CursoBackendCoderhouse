const winston = require(`winston`);

const logger = winston.createLogger({
    level: `warn`,
    transports: [
        new winston.transports.Console({ level: `verbose ` }),
        new winston.transports.File({ filename: `info_winston.log`, level: `error` })
    ]
});

logger.log(`silly`, `log de silly`);
logger.log(`debug`, `log de debug`);
logger.log(`verbose`, `log de verbose`);
logger.log(`info`, `log de info`);
logger.log(`warn`, `log de warn`);
logger.log(`error`, `log de error`);

logger.info(`log de info`);
logger.warn(`log de warn`);
logger.error(`log de error`);