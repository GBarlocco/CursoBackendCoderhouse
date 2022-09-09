const express = require('express')
const mongoose = require('mongoose')
const winston = require('winston')
const compression = require('compression')

const mealRouter = require('./routes/meal.router')

require('dotenv').config()

// const database = require('./config/database')
const { fn } = require('./config/database')

const database = fn(process.env)
mongoose.connect(`mongodb://${database.host}:${database.port}/${database.name}`)
const app = express()
app.set('view engine', 'pug')
app.use(compression())
app.use('/', mealRouter)

const logger = winston.createLogger({
  level: 'warn',
  transports: [
    new winston.transports.Console({ level: 'verbose' })
  ]
})

app.get('', (req, res) => {
  return res.json({ date: new Date() })
})

const PORT = process.argv[2] || 3000

app
  // .listen(PORT, () => console.log(`Aplicación corriendo en el puerto ${PORT}`))
  .listen(PORT, () => logger.info(`Aplicación corriendo en el puerto ${PORT}`))
  .on('error', err => console.error(err))
