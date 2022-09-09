const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const userRouter = require('./Routers/UserRouter')
const consumers = require('./Consumers/consumers')
const databaseFn = require('./config/database')
const loggerFn = require('./utils/logger')

;(async () => {

  dotenv.config()
  const database = databaseFn()
  console.log({ database })
  // await consumers()
  const logger = loggerFn()

  await mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`)

  const app = express()

  app.use(express.json())

  app.use('/api/users', userRouter())

  const PORT = process.env.PORT || 8080

  app.listen(PORT, () => logger.info(`Aplicación corriendo en el puerto ${PORT}`))
})()
