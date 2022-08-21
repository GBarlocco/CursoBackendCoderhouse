const mongoose = require('mongoose');

const dotenv = require(`dotenv`);
dotenv.config();

//const URL =process.env.URL_MONGO;
const URL = `mongodb+srv://gaston:TZCAPpxu5qfvdHYA@cluster0.68nenbr.mongodb.net/test?retryWrites=true&w=majority`;



const connection = mongoose.connect(URL, {
    useNewUrlParser: true
});

module.exports = connection;



