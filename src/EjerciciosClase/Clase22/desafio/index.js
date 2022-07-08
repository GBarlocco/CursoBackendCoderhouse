/*

1) Normalizar la estructura del objeto en formato JSON empresa.json (disponible en la carpeta de la clase) que describe el organigrama de una empresa. 
El gerente y el encargado figuran en el array de empleados de la empresa.

2) Imprimir por consola el objeto normalizado y la longitud del objeto original y del normalizado. Comparar los resultados.

Nota: En adelante, utilizar la siguiente función 'print' para imprimir el contenido de un objeto:

const util = require('util')
const print = (objeto) => {
    console.log(util.inspect(objeto, false, 12, true))
}

*/

/*
Estructura:
    |entidad principal empresa:
                            |dentro de empresa entidad existe un array de empleado:
                                                                        |dentro de empleados existe una entidad puesto
                                                                        |dentro de empleados existe una entidad área
*/

const normalizr = require(`normalizr`);
const empresa = require(`./empresa.json`);
const fs = require('fs');
const util = require('util')

const print = (objeto) => {
    console.log(util.inspect(objeto, false, 12, true));
}

//Comenzamos con los unitarios:
const areaSchema = new normalizr.schema.Entity('area');

const puestoSchema = new normalizr.schema.Entity('puesto');

//Continuamos con los compuestos:
const empleadoSchema = new normalizr.schema.Entity('empleados', {
    area: areaSchema,
    puesto: puestoSchema,
});

//Esquema de mayor nivel:
const empresaSchema = new normalizr.schema.Entity('empresa', {
    empleados: [empleadoSchema]
});

const normalizedEmpresa = normalizr.normalize(empresa, empresaSchema);
const denormalizedEmpresa = normalizr.denormalize(normalizedEmpresa.result, empresaSchema, normalizedEmpresa.entities);

; (async () => {
    try {
        const writePost = await fs.promises.writeFile('./normalizedEmpresa.json', JSON.stringify(normalizedEmpresa, null, 2));
        console.log('Ok');
    } catch {
        throw new Error(`Error al escribir el archivo`);
    }
})();

; (async () => {
    try {
        const writePost = await fs.promises.writeFile('./denormalizedEmpresa.json', JSON.stringify(denormalizedEmpresa, null, 2));
        console.log('Ok');
    } catch {
        throw new Error(`Error al escribir el archivo`);
    }
})();

console.log({
    empresa: JSON.stringify(empresa).length,
    normalizedEmpresa: JSON.stringify(normalizedEmpresa).length,
    denormalizedEmpresa: JSON.stringify(denormalizedEmpresa).length,
})

print(normalizedEmpresa);

