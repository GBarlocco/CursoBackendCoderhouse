export default (a, b) => {

    if (a === undefined || b === undefined) {
        return new Error('Faltan parámetros');
    }

    if (typeof a !== 'number' || typeof b !== 'number') {
        return new Error('Tipos de datos incorrectos');
    }

    return a + b;
}