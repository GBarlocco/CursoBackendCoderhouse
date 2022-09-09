import { Router } from 'express'

import { getDatosController, postDatosController } from './controlador.js'

const datosRouter = new Router()

datosRouter.get('/', getDatosController)
datosRouter.post('/', postDatosController)

export default datosRouter
