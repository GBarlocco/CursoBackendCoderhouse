const datos = []

const recuperarDatos = async () => {
  return datos
}

const guardar = async (dato) => {
  datos.push(dato)
  return dato
}

export {
  recuperarDatos,
  guardar
}
