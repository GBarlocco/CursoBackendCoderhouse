const { Schema, model } = require(`mongoose`);

const carritoSchema = new Schema({
    timestamp: { type: Date, required: true },
    products: { type: Array, required: true },
});

module.exports = model(`Carritos`, carritoSchema);