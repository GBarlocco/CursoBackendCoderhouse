const db = require(`./db`);
const userModel = require("./models/user");


//data que recibimos desde el endpoint, desde la API
const data = {
    name: `Juan`,
    lastname: `Perez`,
    emai: `juanperez@mail.com`,
    username: `juanperez`,
    password: `123456`
};

// Realizamos una isntancia del modelo:
const user = new userModel(data);

db.then(conn => {
    console.log(conn);
});