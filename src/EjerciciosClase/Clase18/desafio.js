// 1) creamos la DB desde la terminal desde mongosh: use empresa

// 2) crear una colecciòn llamada `Clientes` dentro de la DB:

db.createCollection('clientes');

// Para visualizar la db: show collections

// 3) Insertar un documento en la colección clientes que contenga los campos ‘nombre’ y ‘edad’.
/*
const clientes = [
    {
        name: 'Gastón',
        edad: 28
    },
    {
        name: 'Pepe',
        edad: 29
    },
    {
        name: 'Ana',
        edad: 45
    }
]

db.clientes.insertOne({name: 'Gastón',edad: 28);

*/

// 4) Insertar un array de tres documentos con el mismo formato y valores distintos en la colección clientes (modo bulk).
const clientes = [
    {
        name: 'Gastón',
        edad: 28
    },
    {
        name: 'Pepe',
        edad: 29
    },
    {
        name: 'Ana',
        edad: 45
    }
]

db.clientes.insertMany(clientes);


// 5) Utilizando un sólo comando, crear una colección llamada 'articulos' e insertar dentro de ella un array de cuatro documentos con los campos ‘nombre’, ‘precio’ y ‘stock’.

const articulos = [
    {
        name: 'Coca cola',
        precio: 12.21,
        stock: 100
    },
    {
        name: 'Fanta',
        precio: 14.21,
        stock: 80
    },
    {
        name: 'Sprite',
        precio: 20.21,
        stock: 20
    },
    {
        name: 'Agua mineral',
        precio: 10.21,
        stock: 200
    }
];

db.articulos.insertMany(articulos);

// 6) Mostrar las colecciones de la base 'empresa'

//show collections

// 7) Listar todos los documentos dentro de cada una de las colecciones.

db.articulos.find();

db.clientes.find();

// 8) Tomar el Object ID de uno de los documentos y comprobar fecha y hora de creación.

// 9) Mostrar la cantidad de documentos que tiene la colección articulos.

