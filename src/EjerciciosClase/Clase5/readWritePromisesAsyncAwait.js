const fs = require(`fs`);

const contenido = `Esto es una prueba
Segunda linea`;

const contenidoExtra = `
Contenido Extra`;


;(async () => {
    const data = await fs.promises.readFile(`./src/EjerciciosClase/Clase5/testInputPromises.txt`, `utf-8`);
    console.log (data);
    await fs.promises.writeFile(`./src/EjerciciosClase/Clase5/testOutputPromises.txt`,contenido );
})