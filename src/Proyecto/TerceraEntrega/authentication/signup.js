const passport = require('passport');
const sendEmail = require(`../utils/nodemailerGmail`);

const storage = require(`../daos/index`);

const productsStorage = storage().carrito;

const dotenv = require(`dotenv`);
dotenv.config();

const LocalStrategy = require('passport-local').Strategy;
const UserModel = require(`../dataBase/models/user`);
const UserCart = require(`../dataBase/models/carrito`);

const { createHash } = require('../utils/utils');

const signup = () => {
    console.log(`Estoy en signup.js`)
    passport.use('signup', new LocalStrategy({
        //Configuración para obtener todo el req.
        passReqToCallback: true
    }, async (req, username, password, done) => {
        try {
            const user = await UserModel.findOne({ username });
            if (user) {
                return done(null, false);
            }

            /*
            let date = new Date();
            let newCart =new UserCart();
            newCart.timestamp = date;
            newCart.products = [];
            */
            const newUser = new UserModel();
            newUser.username = username;
            newUser.password = createHash(password); //No se puede volver a conocer la contraseña luego de realizarle el hash
            newUser.email = req.body.email;
            newUser.telefono = req.body.tel;
            newUser.edad = req.body.edad;
            newUser.direccion = req.body.direccion;
            newUser.foto = req.file.path;
            newUser.carrito = [];

            const mailOptions = {
                from: process.env.EMAIL,
                to: `barlocco@hotmail.es`,
                subject: `Nuevo registro`,
                html: `
                    <h3>Nuevo registro de usuario!</h3>
                    <p> Datos:</p>
                    <ul>
                    <li> Nombre: ${newUser.username}</li>
                    <li> Email: ${newUser.email}</li>
                    <li> Teléfono: ${newUser.telefono}</li>
                    <li> Edad: ${newUser.edad}</li>
                    <li> Direccion: ${newUser.direccion}</li>
                    </ul>
                `
            };

            const userSave = await newUser.save();

            const email = await sendEmail(mailOptions);

            return done(null, userSave);
        }
        catch (err) {
            done(err);
        }
    }));
}

module.exports = signup;