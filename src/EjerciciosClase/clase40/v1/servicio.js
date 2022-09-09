import { recuperarDatos, guardar } from './persistencia.js'

const obtenerDatos = async () => {
  return recuperarDatos()
}

const crearDato = async (dato) => {
  dato.createdAt = Date.now()
  const datoGuardado = await guardar(dato)
  return datoGuardado
}

export {
  obtenerDatos,
  crearDato
}
