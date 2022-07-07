// creo el schema y modelo

const { Schema, model } = require(`mongoose`);

const usuariosSchema = new Schema({
    nombre: { type: String, required: true, max: 15 },
    apellido: { type: String, required: true, max: 15 },
    dni: { type: String, required: true, max: 15, unique: true },
});

module.exports = model(`Usuarios`, usuariosSchema);