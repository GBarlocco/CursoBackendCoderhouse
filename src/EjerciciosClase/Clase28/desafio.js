/*
Realizar una aplicación en Node.js que permita recibir como parámetros una cantidad ilimitada de números, 
con los cuales debe confeccionar el siguiente objeto (se imprimirá por consola):

{
    datos:{
        numeros: [los numeros ingresados],
        promedio: (promedio de los numeros ingresados),
        max: (valor máximo),
        min (valor mínimo),
        ejecutable: (nombre del ejecutable),
        pid: (process id)
    }
}

En el caso de ingresar un número no válido, se creará un objeto de error con el siguiente formato (se imprimirá por consola):

{
    error:{
        descripcion: `Error de tipo`,
        numeros: [array de entrada], //ejemplo: [1,2,`pepe`,4,true]
        tipo: [array con tipos de entrada] //ej: [number, number, string, number, boolean]
    }
}
En este caso de error, la aplicación saldrá con código de error -5


Si no ingresó ningún número, el objeto de error será:
{
    error:{
        descripcion: `entrada vacía`
    }
}

En este caso de error, la aplicación saldrá con código de error -4
En los casos de error, se representará en consola el código antes de finalizar.

*/

const arrInput = process.argv.slice(2); //nodemon repaso 1 2 abc -name gaston
const arr = [];
const arrTipo = [];
let isNumber = true;

arrInput.forEach(elem => {
    arr.push(Number(elem));
    if (isNaN(elem)) {
        isNumber = false;
    }
});

const promedio = (arr) => {
    let total = 0;

    arr.forEach(num => {
        total += Number(num);
    })
    return total / arr.length;
}

const min = (arr) => {
    let min = Number.MAX_VALUE;

    arr.forEach(num => {
        if (Number(num) < min) {
            min = Number(num);
        }
    })
    return min
}

const max = (arr) => {
    let max = Number.MIN_VALUE;

    arr.forEach(num => {
        if (Number(num) > max) {
            max = Number(num);
        }
    })
    return max
}

const typeofInput = (arr) => {
    arr.forEach(elem => {
        arrTipo.push(typeof (elem));
    });
}


if (isNumber && arrInput.length > 0) {
    let datos = {
        numeros: arrInput,
        promedio: promedio(arrInput),
        max: max(arrInput),
        min: min(arrInput),
        ejecutable: process.argv[0],
        pid: process.pid,
    }
    console.log(datos)

} else {
    let error;
    typeofInput(arrInput);

    if (arrInput.length > 0) {
        error = {
            codigo: -5,
            descripcion: `Error de tipo`,
            numeros: arrInput,
            tipo: arrTipo
        }
    }else{
        error = {
            codigo: -4,
            descripcion: `entrada vacía`,
            numeros: arrInput,
            tipo: arrTipo
        }
    }
    console.log(error)
}

let datos;