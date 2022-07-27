const http = require(`http`);
const { fork } = require(`child_process`);

let visitas = 0;

const server = http.createServer();

/*
MOVIMOS LA FUNCION A COMPUTO

const calcular = () => {
    let suma = 0;
    for (let i = 0; i < 6e9; i++) {
        suma += i;
    }
    return suma;
}
*/

/*
console.log(`Código bloqueante`);
console.log(`inicio`);
console.log(calcular());
console.log(`fin`);
*/

server.on(`request`, (req, res) => {
    const { url } = req;
    if (url === `/calcular`) {
        //const suma = calcular();
        //return res.end(`La suma es ${suma}`);
        const computo = fork(`./computo`);
        computo.on(`message`, suma => {
            return res.end(`La suma es ${suma}`);
        })
    } else if (url === `/`) {
        return res.end(`Total de visitas: ${++visitas}`);
    }
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, err => {
    if (err) {
        throw err;
    }
    console.log(`Servidor escuchando en puerto ${PORT}`);
})