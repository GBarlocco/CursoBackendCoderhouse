// ejemplo idem a microservicio
const express = require(`express`);

const app = express();

const PORT = process.argv[2] || 8080;

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

app.get(`/users`, (req, res) => {
    console.log(`Recuest to users API`)
    return res.json({
        status: `ok`,
        api: `users`
    });
});

//pm2 start users.js --name="users" --watch -- 8081
//pm2 stop users.js --name="users"