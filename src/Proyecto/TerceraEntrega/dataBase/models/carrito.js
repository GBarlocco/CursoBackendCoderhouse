const { Schema, model } = require(`mongoose`);

const carritoSchema = new Schema({
    timestamp: { type: Date, required: true },
    products: { type: Array, required: true },
    owner: { type: Object, require: true }
});

module.exports = model(`Carritos`, carritoSchema);