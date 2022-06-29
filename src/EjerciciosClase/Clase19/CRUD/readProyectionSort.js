const db = require('../db/db');
const userModel = require('../models/user');

db
    .then(_ => userModel.find({}, { name: 1, email: 1, _id: false }).sort({ nombre: -1 }))
    .then(users => console.log(users))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => process.exit());