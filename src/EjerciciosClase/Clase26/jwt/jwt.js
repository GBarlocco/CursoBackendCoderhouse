const express = require(`express`);
const jwt = require(`jsonwebtoken`);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PRIVATE_KEY = `PRIVATEKEYJWT`;

//Usuarios persisten en memoria, simulación de db.
const users = [];

const generateToken = user => {
    const token = jwt.sign({ id: user.id, name: user.username }, PRIVATE_KEY, { expiresIn: `24h` });

    return token;
};

const generateLastId = () => {
    return users.length + 1;
};

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization; //obtenemos desde los headers el token.

    if (!authHeader) {
        return res.status(401).json({
            error: `Necesitas enviar un Token`
        });
    }

    const token = authHeader.split(` `)[1]; // desde el header se envia con la palabra Bearer, como es un string, lo convertimos a array con espacio y accedemos al token que se va a encontrar en el segundo lugar.

    jwt.verify(token, PRIVATE_KEY, (err, payload) => {
        if (err) {
            return res.status(401).json({
                error: `Necesitas enviar un token válido`
            });
        }

        const user = users.find(user => user.id == payload.id);

        delete user.password;

        req.user = user;

        if (!user) {
            return res.status(401).json({
                error: `El usuario no existe`
            });
        }

        return next();
    });
};

app.post(`/signup`, (req, res) => {
    const { username, email, password } = req.body; // lo recibo en formato json desde el body.

    const userExists = users.some(user => user.username === username);

    if (userExists) {
        return res.json({ error: `El nombre de usuario ya existe` });
    }

    const id = generateLastId();

    const user = { id, username, email, password };

    users.push(user);

    const access_token = generateToken(user);

    return res.json({
        user,
        access_token
    });
});

app.post(`/login`, (req, res) => {
    const { username, password } = req.body;// lo recibo en formato json desde el body.

    console.log(`Estoy desde endpoint login`);
    console.log(`username: ${username} `);
    console.log(`password: ${password} `);

    const user = users.find(user => user.username === username && user.password === password);

    console.log(`todos los usuarios:`);
    console.table(users);
    console.log(`usuario encontrado:`);
    console.table(user);

    if (!user) {
        return res.status(401).json({ error: `credenciales incorrectas` });
    }

    const access_token = generateToken(user);

    return res.json({
        user,
        access_token
    });
});

app.get(`/profile`, jwtMiddleware, (req, res) => {
    return res.json(req.user);
})

const PORT = 8080;
app.listen(PORT, () => console.log(`servidor escuchando en el puerto ${PORT}`));

/*
DESDE POSTMAN
-post
-http://localhost:8080/signup

body:

{
    "username": "Gastón",
    "email": "asd@asd.com",
    "password": "123"
}


feedback:
{
    "user": {
        "id": 1,
        "username": "Gastón",
        "email": "asd@asd.com",
        "password": "123"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikdhc3TDs24iLCJpYXQiOjE2NTg2ODYwMzMsImV4cCI6MTY1ODc3MjQzM30.7-C2R-gwvtBEVp-J6WD2-oKKgRyRI2J3jkr_N6zJt_k"
}

dentro de jwt.io copiamos el token (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikdhc3TDs24iLCJpYXQiOjE2NTg2ODYwMzMsImV4cCI6MTY1ODc3MjQzM30.7-C2R-gwvtBEVp-J6WD2-oKKgRyRI2J3jkr_N6zJt_k) 
para visualizar la información


DESDE POSTMAN
-post
-http://localhost:8080/login

body:
{
    "username": "Gastón",
    "password": "123"
}

feedback:
{
    "user": {
        "id": 1,
        "username": "Gastón",
        "email": "asd@asd.com",
        "password": "123"
    },
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikdhc3TDs24iLCJpYXQiOjE2NTg2ODY4MjMsImV4cCI6MTY1ODc3MzIyM30.o-UYsq84RlosTMUhbFeQVCE6xG_20E56020VggETXks"
}



DESDE POSTMAN
-get
-http://localhost:8080/profile

Headers:
- key = Authorization
- Value = Bearer token

Ejemplo de value:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InBlcGUiLCJpYXQiOjE2NTg2ODc1MDYsImV4cCI6MTY1ODc3MzkwNn0.j_M4onSmCEr4C9fyDjTdfAiaJKtEx684kNau9JuPTcA


feedback:
{
    "id": 2,
    "name": "pepe",
    "iat": 1658687506,
    "exp": 1658773906
}

*/