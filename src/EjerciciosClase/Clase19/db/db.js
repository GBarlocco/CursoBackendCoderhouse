const mongoose = require('mongoose');

const URL = 'mongodb://127.0.0.1:27017/clase19';

const connection = mongoose.connect(URL, {
    useNewUrlParser: true
});

module.exports = connection;
