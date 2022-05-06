const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if (divisor == 0) {
            reject(`No se puede dividir entre cero`);
        } else {
            resolve(dividendo / divisor);
        }
    });
}

dividir(10, 2)
    .then((resultado) => {
        console.log(`El resultado de la division es: ${resultado}`);
    })
    .catch((err) => {
        console.log(err);
    }) 