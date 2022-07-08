import suma from './suma.js';

console.log(' === Flujo básico correcto ===');

const expected1 = 8;

const result1 = suma(3, 5);

if (result1 === expected1) {
    console.log('Test completado');
} else {
    throw new Error('Test NO completado');
}

console.log(' === Flujo de error cuando no se reciben todos los parámetros ===');

const expected2 = 'Faltan parámetros';

const result2 = suma(3);

if (result2 instanceof Error && result2.message === expected2) {
    console.log('Test completado');
} else {
    throw new Error('Test NO completado');
}

console.log(' === Flujo de error cuando no se reciben los tipos de datos correctos ===')

const expected3 = 'Tipos de datos incorrectos';

const result3 = suma('uno', '2');

if (result3 instanceof Error && result3.message === expected3) {
    console.log('Test completado');
} else {
    throw new Error('Test NO completado');
}