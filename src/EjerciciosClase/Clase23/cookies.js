const express = require(`express`);
const cookieParser = require(`cookie-parser`);

const app = express();

/*
¿Cómo funciona el middleware cookieParse()?:
    app.use((req, res, next) =>{
    })

    La funcion que esta implementada en cookieParse: trae implementada una función que retorna otra función, 
    y es por eso que al invocarla, retorna un middleware

    const cookieParse = () =>{
        return (req, res, next) =>{
        }
    }
*/

app.use(cookieParser(`pass`));

//endPoint

//Set cookies
app.get(`/set`, (req, res) => {
    res.cookie(`server`, `valor de la cookie 1`).send(`Nueva cookie sin límite de tiempo`);
});

app.get(`/setEX`, (req, res) => {
    res.cookie(`server2`, `valor de la cookie 2`, { maxAge: 3000 }).send(`Nueva cookie CON límite de tiempo`);
});

//Leer cookies
app.get(`/`, (req, res) => {
    return res.status(201).json({
        server: req.cookies.server,
        server2: req.cookies.server2,
        datoProtegido: req.signedCookies.datoProtegido //La cookie se firma con el secreto ingresado en -->app.use(cookieParser(`pass`)), 
                                                       //si la cookie se setea y cambia el secreto, la misma no es accesible.

    });
});

//Borrar cookies
app.get('/clear', (req, res) => {
    res.clearCookie(`server`).send(`Cookie clear`);
});

//Proteger cookies
app.get('/set-signed', (req, res) => {
    return res.cookie(`datoProtegido`, `valor del dato protegido`, { signed: true }).send(`Cookie set`);
})


const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));