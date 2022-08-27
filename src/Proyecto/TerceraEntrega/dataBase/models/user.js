const mongoose = require('mongoose');

const User = mongoose.model('User', mongoose.Schema({
    username: String,
    password: String,
    email: String,
    telefono: Number,
    edad: Number,
    direccion: String,
    foto: String
}));


module.exports = User