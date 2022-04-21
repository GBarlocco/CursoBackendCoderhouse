const mostrarLista = (lista) => lista || "lista vacia";

console.log(mostrarLista(["a","b","c"]));
console.log(mostrarLista());

function crearMultiplicador(n1){
    return (n2) => n1*n2;
}

const duplicar = crearMultiplicador(2);
const triplicar = crearMultiplicador(3);

console.log (duplicar(4));
console.log(triplicar(3));