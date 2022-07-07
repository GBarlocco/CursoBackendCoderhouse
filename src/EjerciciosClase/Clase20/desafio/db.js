const mongoose = require('mongoose');

//const URL =  'mongodb://127.0.0.1:27017/desafioEcommerce';
const URL = 'mongodb+srv://gaston:YQ44NAftteK7zIhm@cluster0.4birw6o.mongodb.net/desafioEcommerce?retryWrites=true&w=majority';

const connection = mongoose.connect(URL, {
    useNewUrlParser: true
}).then(_ => console.log('conection'));

module.exports = connection;
