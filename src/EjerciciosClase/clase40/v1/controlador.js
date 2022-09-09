import { obtenerDatos, crearDato } from './servicio.js'

const getDatosController = async (req, res) => {
  try {
    const datos = await obtenerDatos()
    return res.json(datos)
  } catch (e) {
    return res.status(500).json({
      error: e.message
    })
  }
}

const postDatosController = async (req, res) => {
  const dato = req.body

  try {
    const datoCreado = await crearDato(dato)
    return res.status(201).json(datoCreado)
  } catch (e) {
    return res.status(500).json({
      error: e.message
    })
  }
}

export {
  getDatosController,
  postDatosController
}
