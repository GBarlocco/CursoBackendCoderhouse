const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: String, required: true },
  createdAt: { type: Date, required: true }
})

const productModel = mongoose.model('Product', ProductSchema)

module.exports = productModel
