const express = require(`express`);

const app = express();

const PORT = 8080;

//1)
//a) Ruta get '/api/sumar/5/6
app.get(`/api/sumar/:num1/:num2`, (req, res) => {
    const { num1, num2 } = req.params;
    /*
    const {num1, num2} = req.params;
    Es igual que:
    const num1 = req.params.num1
    const num2 = req.params.num2
    */

    if (isNaN(req.params.num1) || isNaN(req.params.num2)) {
        return res.status(404).json({
            error: `El parámetro ingresado debe ser un número`
        });
    }

    const resultado = Number(num1) + Number(num2);
    return res.json(resultado);
});


//b) Ruta get '/api/sumar?num1=5&num2=62) 


//c) Ruta get '/api/operacion/5+6
app.get(`/api/operaciones/:numeros`, (req, res) => {
    const numerosOperacion = req.params.numeros.split("+");
    console.table(numerosOperacion);
    return res.json(Number(numerosOperacion[0]) + Number(numerosOperacion[1]));

});

// 2)Implementar las rutas post, put y delete en la dirección '/api' respondiendo 'ok' + (post/put/delete) según corresponda. 

app.post(`/api` , (req, res) =>{
    res.json ({message:`OK ${req.method}`});
});

app.put(`/api` , (req, res) =>{
    res.json ({message:`OK ${req.method}`});
});

app.delete(`/api` , (req, res) =>{
    res.json ({message:`OK ${req.method}`});
});

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando puerto ${PORT}`);
});

server.on(`error`, err => {
    console.log(`error en el servidor: ${err}`)
});
