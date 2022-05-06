const fs = require(`fs`);

const dataRead = fs.readFileSync(`./src/EjerciciosClase/Clase5/testInputSync.txt`, `utf-8`);

console.log(dataRead);

fs.writeFileSync(`./src/EjerciciosClase/Clase5/testOutputSync.txt`, `Esto es una prueba de escritura sincrónica`);

const contenidoExtra = `
Esto es un agregado`;

fs.appendFileSync(`./testOutputSync.txt`, contenidoExtra);


//Manejando errores con funciones bloqueantes / asíncronas

try {
    const dataNoExiste = fs.readFileSync(`/ruta/no/valida`, `utf-8`);
} catch (err) {
    console.error(err.message);
}

console.log(`No se rompe el programa, ya que utilizamos try & catch`)