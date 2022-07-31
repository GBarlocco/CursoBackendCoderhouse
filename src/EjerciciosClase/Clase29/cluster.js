const cluster = require(`cluster`);
const http = require(`http`);

const numCPUs = require(`os`).cpus().length;
console.log(`Numero de CPUS: ${numCPUs}, ¿Es master:? ${cluster.isMaster}`);
console.log(``);

// El primero que levantamos es maestro, luego los demas son worker, porque estamos ejecutando cluster.fork()
if (cluster.isMaster) {
    console.log(`Nodo primario ${process.pid} corriendo`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); //cuando hago fork del mismo script, se levanta el proceso en modo worker
    }

    cluster.on(`exit`, (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} finalizado`);
        //si detecto que finaliza, puedo levantarlo nuevamente con cluster.fork().
    })
} else {
    console.log(`Nodo Worker corriendo en el proceso ${process.pid}`);

    const PORT = 8080;

    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`hello, process: ${process.pid}`);
    }).listen(PORT);
}