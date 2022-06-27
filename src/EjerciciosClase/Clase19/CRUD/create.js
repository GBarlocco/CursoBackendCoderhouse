const db = require(`../db/db`);
const userModel = require(`../models/user`);

//data que recibimos desde el endpoint, desde la API
const data = {
    name: `Juan`,
    lastname: `Perez`,
    email: `juanperez@mail.com`,
    username: `juanperez`,
    password: `123456`
};

// Realizamos una instancia del modelo:
const user = new userModel(data);

db
    .then(_ => user.save())
    .then(document => console.log(`User sabed`, document))
    .catch(err => console.log(`Error: ${err.message}`))
    .finally(() => process.exit());


