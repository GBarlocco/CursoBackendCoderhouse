const winston = require('winston')

let logger = null

module.exports = () => {

  if (!logger) {
    console.log('Creando logger')

    logger = winston.createLogger({
      level: 'warn',
      transports: [
        new winston.transports.Console({ level: 'verbose' })
      ]
    })

    return logger
  }

  console.log('Retorno logger ya creado')

  return logger
}