// Terminal 1: Ejecutar el server: nodemon server 8080 FORK
// Terminal 2: artillery quick –-count 50 -n 40 http://localhost:8080?max=100000 > result_fork.txt

// Terminal 1: Ejecutar el server: nodemon server 8080 CLUSTER
// Terminal 2:  artillery quick –-count 50 -n 40 http://localhost:8080?max=100000 > result_cluster.txt

const express = require('express');
const cluster = require(`cluster`);
const { cpus } = require(`os`);

const PORT = parseInt(process.argv[2]) || 8080;
const modoCluster = process.argv[3] == 'CLUSTER';

const isPrime = (num) => {
    if ([2, 3].includes(num)) return true;
    else if ([2, 3].some(n => num % n == 0)) return false;
    else {
        let i = 5, w = 2;
        while ((i ** 2) <= num) {
            if (num % i == 0) return false
            i += w;
            w = 6 - w;
        }
    }
    return true;
}

if (modoCluster && cluster.isPrimary) {
    const numCPUs = cpus().length;

    console.log(`Número de procesadores: ${numCPUs}`);
    console.log(`PID MASTER ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log('Worker', worker.process.pid, 'died', new Date().toLocaleString());
        cluster.fork();
    });
} else {
    const app = express();

    app.get('/', (req, res) => {
        const primes = [];
        const max = Number(req.query.max) || 1000;

        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) primes.push(i)
        }
        res.json(primes);
    });

    app.listen(PORT, () => {
        console.log(`Servidor express escuchando en el puerto ${PORT}`);
        console.log(`PID WORKER ${process.pid}`);
    });
}