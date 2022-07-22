const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

const { createHash, isValidPassword } = require('./utils');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const UserModel = require('./models/user');

mongoose.connect('mongodb://localhost:27017/clase25');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());


const strategyLogin = new LocalStrategy(async (username, password, callbackDone) => {
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return callbackDone(null, false, { message: `Nombre de usuario incorrecto` });
        }
        if (!isValidPassword(user.password, password)) {
            return callbackDone(null, false, { message: `Contraseña incorrecta` });
        }
        return callbackDone(null, user);
    }
    catch (err) {
        callbackDone(err);
    }
});


/*
    strategySignup:
    passport por defecto toma el username & password de req.body.username, req.body.password,
    en nuestro modelo para ingresar a la DB tenemos también email, entonces, para obtener el
    email indicamos que queremos recibir todo el req.
*/
const strategySignup = new LocalStrategy({
    //Configuración para obtener todo el req.
    passReqToCallback: true
}, async (req, username, password, callbackDone) => {
    try {
        const user = await UserModel.findOne({ username });
        if (user) {
            return callbackDone(null, false, { message: `El nombre de usuario ya existe` });
        }

        const newUser = new UserModel();
        newUser.username = username;
        newUser.password = createHash(password); //No se puede volver a conocer la contraseña luego de realizarle el hash
        newUser.email = req.body.email;

        const userSave = await newUser.save();

        return callbackDone(null, userSave);
    }
    catch (err) {
        callbackDone(err);
    }
});

passport.use('login', strategyLogin);
passport.use('signup', strategySignup);

passport.serializeUser((user, callbackDone) => {
    console.log(`serializeUser`);
    callbackDone(null, user._id);
});

passport.deserializeUser(async (id, callbackDone) => {
    console.log(`deserializeUser`);
    try {
        const user = await UserModel.findById(id);
        callbackDone(null, user);
    } catch (err) {
        callbackDone(err);
    }
});


app.get('/login', (req, res) => {
    return res.render('login', { message: req.flash('error') }); // desde la vista obtenemos el array: <%= message.join(', ') %>
});

app.post('/login', passport.authenticate('login', { //indicamos el controlador de passport, llega desde el formulario de login.
    successRedirect: '/', //redirect es con método get, vamos a home.
    failureRedirect: '/login', // redirect es con método get, vamos a /login de get.
    failureFlash: true  // nos permite enviar mensajes.
}));

app.get('/signup', (req, res) => {
    return res.render('signup', { message: req.flash('error') }) // desde la vista obtenemos el array: <%= message.join(', ') %>
});

app.post('/signup', passport.authenticate('signup', {//indicamos el controlador de passport, llega desde el formulario de signup.
    successRedirect: '/', // redirect es con método get, vamos a home.
    failureRedirect: '/signup', // redirect es con método get, vamos a /signup de signup.
    failureFlash: true // nos permite enviar mensajes.
}));

app.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/login');

}, (req, res) => {
    return res.json(req.user);
})

const PORT = 8080;

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));



















