// EJERCICIO APIRest

const express = require(`express`);

const app = express();


const frase = `Hola como estas`;

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando puerto: ${PORT}`);
});

//1)
app.get(`/api/frase`, (req, res) => {
    return res.json(frase);
});

//2)
app.get(`/api/letras/:num`, (req, res) => {
    if (req.params.num > frase.length - 1) {
        return res.status(404).json({
            error: `letra no encontrada`
        });
    }

    if (isNaN (req.params.num)) {
        return res.status(404).json({
            error: `El parámetro ingresado debe ser un número`
        });
    }

    const letra = frase.charAt(req.params.num);
    console.log(letra);
    return res.json(letra);
})

//3
app.get(`/api/palabras/:num`, (req, res)=>{
    const num = req.params.num;
    const palabrasArray = frase.split(` `);

    if (req.params.num > palabrasArray.length - 1) {
        return res.status(404).json({
            error: `Palabra no encontrada, excede la cantidad máxima`
        });
    }

    if (isNaN (req.params.num)) {
        return res.status(404).json({
            error: `El parámetro ingresado debe ser un número`
        });
    }

    return res.json(`la palabra seleccionada es: ${palabrasArray[num]}`);

});





