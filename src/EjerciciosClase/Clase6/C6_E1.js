const http = require (`http`);

const server = http.createServer((req, res) =>{
    const  date = (new Date()).getHours();
    
    date >= 6 && date <12 ? res.end(`Buenos días!`) : null;
    
    date >= 12 && date <19 ? res.end(`Buenos tardes!`) : null;
    
    date >= 20 ? res.end(`Buenos noches!`) : null;
    
})

const connectedServer = server.listen(8080, () =>{
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`);
})