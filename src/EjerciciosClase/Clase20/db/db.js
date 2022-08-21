const mongoose = require('mongoose');

const URL = 'mongodb+srv://gaston:FSLIPAh24xI5kEDI@cluster0.pfeelaw.mongodb.net/clase20A?retryWrites=true&w=majority';

const connection = mongoose.connect(URL, {
    useNewUrlParser: true
});

module.exports = connection;

