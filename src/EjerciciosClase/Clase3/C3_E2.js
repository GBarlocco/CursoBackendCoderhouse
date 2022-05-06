const fs = require(`fs`);

const date = Date().toLocaleString();

try {
    fs.writeFileSync(`./fyh.txt`, date);

} catch (err) {
    console.error(err);
}

try {
    const date = fs.readFileSync(`./fyh.txt`, `utf-8`);
    console.log(`La fecha actual es ${date}`);
} catch (err) {
    console.error(err);
}