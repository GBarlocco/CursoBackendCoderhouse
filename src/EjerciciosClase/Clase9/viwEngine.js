const express = require(`express`);
const app = express();
const fs = require(`fs`);

/*
const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <span>Contenido estatico</span>
    </body>
    </html>
`;

const comiple = html =>{
    return html.replace(`estatico`, `dinamico`);
}
*/

app.engine(`myTemplate`, (filePath, option, callback) => {
    console.log(`renderizando la vista... `)
    fs.readFile(filePath, (err, content) => {
        if (err) {
            return callback(new Error(err));
        }

        const rendered = content.toString()
            .replace(`#title#`, option.title)
            .replace(`#message#`, option.message)
            .replace(`#name#`, option.name);

        return callback(null, rendered);
    });
});

app.set(`views`, `./views`);
app.set(`view engine`, `myTemplate`);

app.get(``, (req, res) => {
    const data = {
        title: `Hola`,
        message: `motor de plantilla propio`,
        name: `Gastón`
    }
    return res.render(`index`, data);
});

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`servidor HTTP corriendo en puerto ${PORT}`);
});

server.on(`error`, error => console.log(`error en el servidor ${error}`));