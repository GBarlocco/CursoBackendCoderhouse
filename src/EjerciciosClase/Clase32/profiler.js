// ------------------------------------ PRUEBA 1: ------------------------------------
// Terminal 1: Ejecutamos el servidor --> node --prof profiler.js

// Realizamos peticion HTTP, registrar usuario en memoria --> http://localhost:8080/newUser?username=%22gaston%22&password=qwert123

// Terminal 2: Ejecutamos analisis de carga, con registro de usuario bloqueante -->  artillery quick –-count 10 -n 50 "http://localhost:8080/auth-bloq?username=asd&password=qwert123" > result_authBloq.txt


// ------------------------------------ PRUEBA 2: ------------------------------------
// Terminal 1: Ejecutamos el servidor --> node --prof profiler.js

// Realizamos peticion HTTP, registrar usuario en memoria --> http://localhost:8080/newUser?username=%22gaston%22&password=qwert123

// Terminal 2: Ejecutamos analisis de carga, con registro de usuario bloqueante -->  artillery quick –-count 10 -n 50 "http://localhost:8080/auth-nobloq?username=gaston&password=qwert123" > result_authNoBloq.txt


// ------------------------------------ .log --> .txt ------------------------------------
// Convertimos los archivos ".log" a txt:
// node --prof-process bloq-v8.log > result_prof-bloq.txt
// node --prof-process noBloq-v8.log > result_prof-noBloq.txt


// ------------------------------------ PRUEBA 3: ------------------------------------
// Terminal 1: Ejecutamos el servidor --> node --inspect profiler.js
// abrimos en chrome --> chrome://inspect/#devices


// ------------------------------------ PRUEBA 4: ------------------------------------
// Terminal 1: 0x profiler.js

// Realizamos peticion HTTP, registrar usuario en memoria --> http://localhost:8080/newUser?username=%22gaston%22&password=qwert123

// Terminal 2: node benchmark.js

// Luego se generan las gràficas.

const express = require("express");
const crypto = require("crypto");

const app = express();

const users = {}

app.use(express.static('public'));

const PORT = parseInt(process.argv[2]) || 8080;

const server = app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

server.on("error", (error) => console.log(`Error en servidor: ${error}`));

app.get("/getUsers", (req, res) => {
    res.json({ users });
})

app.get("/newUser", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";

    username = username.replace(/[!@#$%^&*]/g, "");

    if (!username || !password || users[username]) {
        return res.sendStatus(400);
    }

    const salt = crypto.randomBytes(128).toString("base64");
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

    users[username] = { salt, hash };

    res.sendStatus(200);
});


app.get("/auth-bloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";

    username = username.replace(/[!@#$%^&*]/g, "");

    if (!username || !password || !users[username]) {
        process.exit(1)
        // return res.sendStatus(400);
    }

    const { salt, hash } = users[username];
    const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512");

    if (crypto.timingSafeEqual(hash, encryptHash)) {
        res.sendStatus(200);
    } else {
        process.exit(1)
        // res.sendStatus(401);
    }
});


app.get("/auth-nobloq", (req, res) => {
    let username = req.query.username || "";
    const password = req.query.password || "";
    username = username.replace(/[!@#$%^&*]/g, "");

    if (!username || !password || !users[username]) {
        process.exit(1)
        // return res.sendStatus(400);
    }
    crypto.pbkdf2(password, users[username].salt, 10000, 512, 'sha512', (err, hash) => {
        if (users[username].hash.toString() === hash.toString()) {
            res.sendStatus(200);
        } else {
            process.exit(1)
            //res.sendStatus(401);
        }
    });
});
