const db = require('../db/db');
const userModel = require('../models/user');

db
    .then(_ => userModel.findOne({ username: 'juanperez' }))
    .then(user => {
        return user.remove();
    })
    .then(user => console.log(user))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => process.exit());