// ejemplo idem a microservicio

const express = require(`express`);
const app = express();

const PORT = process.argv[2] || 8080;

app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));

app.get(`/products`, (req, res) => {
    console.log(`Recuest to products API`)
    return res.json({
        status: `ok`,
        api: `users`
    });
});

//pm2 start products.js --name="products" --watch -- 8082
//pm2 stop products.js --name="products"