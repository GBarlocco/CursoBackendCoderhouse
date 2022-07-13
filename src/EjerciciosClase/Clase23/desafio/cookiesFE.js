/*
Inyectar cookies en frontend

Realizar un programa de backend que permita gestionar cookies desde el frontend. Para ello: 
- Definir una ruta “cookies”.
- Definir un método POST que reciba un objeto con el nombre de la cookie, su valor y el tiempo de duración en segundos, y que genere y guarde dicha cookie.
- Definir un método GET que devuelva todas las cookies presentes.
- Definir un método DELETE que reciba el nombre de una cookie por parámetro de ruta, y la elimine.

Notas:
- 1: Utilizar la librería express como estructura de servidor.
- 2: Si algún parámetro recibido es inválido, o directamente inexistente, el servidor devolverá un objeto de error.
     Ej: { error: 'falta nombre ó valor' } o { error: 'nombre no encontrado' }. Si todo sale bien, devolver el objeto { proceso: 'ok'}.
- 3: Si el tiempo no está presente, generar una cookie sin tiempo de expiración.
- 4:  Generar los request con varios navegadores (Chrome, edge, Firefox) para simular los distintos clientes en forma local.
*/

const express = require(`express`);
const cookieParser = require(`cookie-parser`);

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(``));

//Middleware - validadores
const validadorPost = () => {
    return (req, res, next) => {
        const dataCookie = req.body;

        let nombreCookie = '';
        let valorCookie = ``;
        console.log(dataCookie);

        if (!dataCookie || dataCookie === undefined) {
            return res.status(404).json({ error: "Error en validacón" });
        }

        if (nombreCookie == undefined || valorCookie == undefined) {
            return res.status(404).json({ error: -2, descripcion: `falta nombre ó valor` });
        }

        next();
    }
}

const validadorDelete = () => {
    return (req, res, next) => {
        const cookieDelete = req.params.nombre;
        const allCookies = req.cookies;

        if (allCookies[`${cookieDelete}`] === undefined) {
            return res.status(404).json({ error: "El nombre de la cookie no existe" });
        }

        next();
    }

}

//endPoint
app.get(`/cookies`, (req, res) => {
    return res.status(201).json(req.cookies);
});

app.post(`/cookies`, validadorPost(), (req, res) => {
    const dataCookie = req.body;

    let nombreCookie = dataCookie.nombre;
    let valorCookie = dataCookie.valor;
    let duracionCookie = dataCookie.duracion;

    if (duracionCookie === undefined) {
        return res.cookie(`${nombreCookie}`, `${valorCookie}`).send(`Nueva cookie sin límite de tiempo`);
    } else {
        return res.cookie(`${nombreCookie}`, `${valorCookie}`, { maxAge: `${duracionCookie}` }).send(`Nueva cookie CON límite de tiempo`);
    }

});

app.delete(`/cookies/:nombre`, validadorDelete(), (req, res) => {
    res.clearCookie(req.params.nombre).send(`Cookie clear`);
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));


/*
POSTAN - POST: http://localhost:8080/cookies
{
    "nombre": "nombre2",
    "valor": "valor2"
    "duracion": 3000
}

POSTAN - POST: http://localhost:8080/cookies
{
    "nombre": "nombre2",
    "valor": "valor2"
}

POSTAN - GET: http://localhost:8080/cookies

POSTAN - DELETE: http://localhost:8080/cookies/nombre2
*/