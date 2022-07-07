const db = require(`../db/db`);
const userModel = require(`../models/user`);

db
    .then(_ => userModel.find())
    .then(users => console.log(users))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => process.exit());