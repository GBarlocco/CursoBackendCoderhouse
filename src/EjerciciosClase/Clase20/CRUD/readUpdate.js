const db = require('../db/db');
const userModel = require('../models/user');

db
    .then(_ => userModel.findOne({ username: 'juanperez' }))
    .then(user => {
        user.password = 'aaaaa';
        user.email = "juanperez@gmail.com";
        return user.save();
    })
    .then(user => console.log(user))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => process.exit());
