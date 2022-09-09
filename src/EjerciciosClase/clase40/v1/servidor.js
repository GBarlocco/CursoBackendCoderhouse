import express from 'express'
import datosRouter from './ruteo.js'

const app = express()

app.use(express.json())

app.use('/api/datos', datosRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`))
