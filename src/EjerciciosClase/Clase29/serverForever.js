const http = require(`http`);
console.log(`Node corriendo en el proceso ${process.pid}`);

const PORT = process.argv[2] || 8080;

http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`hello, process: ${process.pid}`);
}).listen(PORT);


// forever start serverForever.js

// forever start serverForever.js 8081

// forever start serverForever.js 8082