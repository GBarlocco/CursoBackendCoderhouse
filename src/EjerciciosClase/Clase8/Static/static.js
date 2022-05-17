const express = require (`express`);

const app = express();

const PORT = 8080;

const server = app.listen(PORT, () =>{
    console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});

server.on(`error`, error =>{
    console.log(`Error en el servidor ${error}`)
});

app.use(express.static(__dirname + `/public`));