import { usuariosFiltrados } from './db.js';

const expected = [
    {
        user: 'David',
        age: 21
    },
    {
        user: 'Juan',
        age: 24
    }
];

const maxAge = 21;

/*
El problema se da cuando queremos probar el programa, y la programación contiene por ejemplo la conexión a una DB,
entonces, para aislar el sistema y garantizar el correcto funcionamiento, nos creamos un Mock de la DB.
En este caso forzamos en la función get un arreglo de usuarios (esto lo tendría que devolver la DB)
*/
class MockDB {
    constructor(options) {
    }

    get() {
        return [
            {
                user: 'David',
                age: 21
            },
            {
                user: 'Juan',
                age: 24
            },
            {
                user: 'Carlos',
                age: 18
            },
            {
                user: 'Jorge',
                age: 20
            },
            {
                user: 'Adrian',
                age: 17
            }
        ]
    }
}

const mockDB = new MockDB();

const result = usuariosFiltrados(mockDB, maxAge);

//Validamos código:
if (JSON.stringify(result) === JSON.stringify(expected)) {
    console.log('Test completado');
} else {
    console.log('Test fallido');
}
