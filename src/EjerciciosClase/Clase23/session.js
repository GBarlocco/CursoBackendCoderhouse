const express = require(`express`);
const session = require(`express-session`);

const users = [
    {
        username: `gaston`,
        password: `pass`,
        admin: true
    },
    {
        username: `adrian`,
        password: `pass1`,
        admin: false
    }
];

const authValidator = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    return res.status(401).json({
        error: `Necesitas iniciar session`
    });
}

const adminValidator = (req, res, next) => {
    if (req.session.admin) {
        return next();
    }
    return res.status(401).json({
        error: 'Necesitas ser usuario administrador'
    });
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: `pass`,
    resave: true,
    saveUninitialized: true
}));

app.get(`/`, (req, res) => {
    if (req.session.contador) {
        console.log(`siguientes veces`);
        req.session.contador++;
        return res.send(`Has visitado ${req.session.contador} veces el sitio`);
    }

    console.group(`Primera vez`);
    req.session.contador = 1;
    return res.send(`Bienvenido`);
});

app.get(`/logout`, (req, res) => {
    return req.session.destroy(err => {
        if (!err) {
            return res.send({ logout: true });
        }
        return res.send({ error: err });
    });
});

app.post(`/login`, (req, res) => {
    const { username, password } = req.body;

    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return res.status(401).json({ error: `Login failed` });
    }
    req.session.user = username;
    req.session.admin = user.admin;

    return res.json({
        user: req.session.user,
        admin: req.session.admin
    });

});

app.get(`/profile`, authValidator, (req, res) => {
    return res.json(req.session);
})

app.get(`/admin`, adminValidator, authValidator, (req, res) => {
    return res.json({
        message: 'usuario log: Admin, puede acceder a esta sección'
    })
})

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));


/*
GET: http://localhost:8080/logout

GET: http://localhost:8080/profile

POST: http://localhost:8080/login
body:
{
    "username": "gaston",
    "password": "pass"
}

body:
{
    "username": "adrian",
    "password": "pass1"
}

GET: http://localhost:8080/admin
*/