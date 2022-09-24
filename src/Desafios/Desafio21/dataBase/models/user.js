const mongoose = require('mongoose');

const User = mongoose.model('User', mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    telefono: { type: Number, required: true },
    edad: { type: Number, required: true },
    direccion: { type: String, required: true },
    foto: { type: String, required: true },
    carrito: { type: Array, required: true },
    admin: { type: Boolean, required: true }
}));


module.exports = User