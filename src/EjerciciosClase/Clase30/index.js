// ejemplo Proxy invero (reverse) para levantar los microservicios
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use((req, res, next) => {
    console.log(req.path);
    console.log(req.headers);
    return next();
});

app.use('/users', createProxyMiddleware({ target: 'http://localhost:8081', changeOrigin: true }));
app.use('/products', createProxyMiddleware({ target: 'http://localhost:8082', changeOrigin: true }));
app.listen(3000);


//pm2 start index.js --name="proxy" --watch
//pm2 stop index.js --name="proxy"

