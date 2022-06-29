const db = require('../db/db');
const userModel = require('../models/user');

db
    .then(_ => userModel.deleteOne({
        username: 'juanperez'
    }))
    .then(result => console.log(result))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => process.exit());
