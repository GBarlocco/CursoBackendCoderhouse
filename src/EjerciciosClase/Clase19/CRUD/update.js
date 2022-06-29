const db = require('../db/db');
const userModel = require('../models/user');

db
    .then(_ => userModel.updateOne({
        username: 'juanperez'
    },
        {
            $set: { password: '333' }
        }
    ))
    .then(result => console.log(result))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => process.exit());