const { Schema, model } = require(`mongoose`);

const productoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    codigo: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    cantidad: { type: Number }
});

module.exports = model(`Productos`, productoSchema);