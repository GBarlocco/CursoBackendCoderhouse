//Asincronismo y callback

const fin = () => console.log (`Termine`);

const mostrarLetra = (palabra ,  callback) =>{
    let i = 0;
    const interval = setInterval (() => {
        const letra = palabra[i];
        i++;
        if (letra){
            console.log(letra)
        }else{
            clearInterval(interval);
            callback();
        }
        
    }, 1000)
}

setTimeout(() => {
    mostrarLetra (`primeraPalabra`, fin);
}, 700);

setTimeout(() => {
    mostrarLetra (`segundaPalabra`, fin);
}, 1500); 

setTimeout(() => {
    mostrarLetra (`terceraPalabra`, fin);
}, 2000); 