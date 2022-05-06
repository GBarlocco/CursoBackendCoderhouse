const fs = require(`fs`);

const date = Date().toLocaleString();

try {
    fs.writeFileSync(`./src/EjerciciosClase/Clase3/fyh.txt`, date);

} catch (err) {
    console.error(err);
}

try {
    const date = fs.readFileSync(`./src/EjerciciosClase/Clase3/fyh.txt`, `utf-8`);
    console.log(`La fecha actual es ${date}`);
} catch (err) {
    console.error(err);
}