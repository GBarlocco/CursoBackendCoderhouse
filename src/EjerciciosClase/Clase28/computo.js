
const calcular = () => {
    let suma = 0;
    for (let i = 0; i < 6e9; i++) {
        suma += i;
    }
    return suma;
}

const suma = calcular();

process.send(suma);