const express = require('express');
const session = require('express-session');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: '123',
    resave: true,
    saveUninitialized: true
}));

const users = [];

const router = express.Router();
app.use('/api', router);

router.post('/register', (req, res) => {

    const { username, password } = req.body;

    const userExists = users.find(elem => elem.username === username);

    if (userExists) {
        res.json({ Error: 'Usuario existente, seleccione otro nombre' });
    } else {
        users.push({ username: username, password: password });
        res.send('Usuario agregado');
    }
})

router.get('/data', (req, res, next) => {
    if (!req.session.username) {
        return res.send('Debes estar logueado para acceder a esta sección');
    }

    return next();
}, (req, res) => {
    return res.send(`Nombre de usuario: ${req.session.username}`);
})

router.post('/login', (req, res) => {

    const { username, password } = req.body;

    const userExists = users.find(elem => {
        return elem.username === username && elem.password === password
    });

    if (userExists) {
        req.session.username = username;
        res.redirect('/api/data');
    } else {
        res.json({ Error: 'Usuario o contraseña inválidos' });
    }
})


router.get('/logout', (req, res) => {

    return req.session.destroy(err => {
        if (!err) {
            return res.send('Logout successfull');
        }
        return res.send({ error: err });
    })
})

app.listen(8080, () => console.log('Servidor corriendo'));