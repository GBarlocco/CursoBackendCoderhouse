const fs = require(`fs`);

const contenido = `Esto es una prueba
Segunda linea`;

const contenidoExtra = `
Contenido Extra`;

fs.promises.readFile(`./src/EjerciciosClase/Clase5/testInputPromises.txt`, `utf-8`)
    .then(data => {
        console.log(data);
        return fs.promises.writeFile(`./src/EjerciciosClase/Clase5/testOutputPromisesasd.txt`,contenido );
    })
    .then(()=>{
        console.log(`al utilizar el return anterior, cuando termina se dispara este then --> archivo generado`);
        return fs.promises.writeFile(`./src/EjerciciosClase/Clase5/testOutputPromisesasd.txt`,"lo borre" );
    })
    .then (() =>{
        console.log(`al utilizar el return anterior, cuando termina se dispara este then --> archivo actualizado`);
    })
    .catch(err => {
        console.error(err);
    })