const { Schema, model } = require(`mongoose`);

const ordenesSchema = new Schema({
    timestamp: { type: Date, required: true },
    products: { type: Array, required: true },
    idOwner: { type: Object, require: true }
});

module.exports = model(`Ordenes`, ordenesSchema);