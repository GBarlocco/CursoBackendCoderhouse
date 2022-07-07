const db = require('./db');
const userModel = require('./userModel');

db
    .then(_ => userModel.findOne({ username: 'Carlos' }))
    .then(user => {
        user.nombre = 'Juan Carlos';
        return user.save();
    })
    .then(_ => userModel.find())
    .then(users => console.log(users))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => process.exit());
