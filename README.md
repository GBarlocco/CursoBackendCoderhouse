# Tareas de clase & Desafíos

## Introducción
En el siguiente documento se detallarán las tareas realizadas en clase.

## Ejercicio: Datos y variables (C1_E1.js)
1) Definir variables variables que almacenen los siguiente datos:
Un nombre: “pepe”
- Una edad: 25
- Un precio: $99.90
- Los nombres de mis series favoritas: “Dark”, “Mr Robot”, “Castlevania”
- Mis películas favoritas, en donde cada película detalla su nombre, el año de estreno, y una lista con los nombres de sus protagonistas.

2) Mostrar todos esos valores por consola.

3) Incrementar la edad en 1 y volver a mostrarla.

4) Agregar una serie a la lista y volver a mostrarla.

Solución:

``` 
const name = "pepe";
let age = "25";
const price = 99.99;
const mySeries = ["Dark", "Mr Robot", "Castlevania"];
const myFavoriteFilm = [
    {
        name: "a",
        year: 2000,
        protagonists: ["a", "b", "c"],
    },
    {
        name: "b",
        year: 2000,
        protagonists: ["a", "b", "c"],
    },
    {
        name: "c",
        year: 2000,
        protagonists: ["a", "b", "c"],
    },
]

console.log("name", name);
console.log("age", age);
console.log("price", price);
console.log("mySeries", mySeries);
console.log("myFavoriteFilm", myFavoriteFilm);

age++;
console.log(age);

mySeries.push("nueva serie");
console.log(mySeries);
```

## Ejercicio: Funciones y Closures (C2_E1.js)
1)	Definir la función mostrarLista que reciba una lista de datos y muestre su contenido, si no está vacía, o de lo contrario muestre el mensaje: “lista vacía”. Luego, invocarla con datos de prueba para verificar que funciona bien en ambos casos.

2)	Definir una función anónima que haga lo mismo que la del punto 1, e invocarla inmediatamente, pasando una lista con 3 números como argumento.

3)	Definir la función crearMultiplicador que reciba un número y devuelva una función anónima que reciba segundo número y dé como resultado el producto de ambos. Luego, a partir de la función definida, crear dos funciones duplicar y triplicar, y probarlas con diferentes valores

Solución:
```
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

```

## Ejercicio: Clases (C2_E2.js)
En este ejercicio construiremos una herramienta que permita que diferentes personas puedan llevar cuentas individuales sobre algo que deseen contabilizar, al mismo tiempo que nos brinde una contabilidad general del total contado. Para ello:

1) Definir la clase Contador.
2) Cada instancia de contador debe ser identificada con el nombre de la persona responsable de ese conteo.
3) Cada instancia inicia su cuenta individual en cero.
4) La clase en sí misma posee un valor estático con el que lleva la cuenta de todo lo contado por sus instancias, el cual también inicia en cero.
5) Definir un método obtenerResponsable que devuelva el nombre del responsable de la instancia.
6) Definir un método obtenerCuentaIndividual que devuelva la cantidad contada por la instancia.
7) Definir un método obtenerCuentaGlobal que devuelva la cantidad contada por todos los contadores creados hasta el momento.
8) Definir el método contar que incremente en uno tanto la cuenta individual como la cuenta general.

Solución:
```
class Contador {
    constructor(name) {
        this.name = name;
        this.count = 0;
    }
    static totalCount = 0;

    obtenerResponsable() {
        return this.name;
    }

    obtenerCuentaIndividual() {
        return this.count;
    }

    obtenerCuentaGlobal() {
        return Contador.totalCount;
    }

    contar() {
        this.count++;
        Contador.totalCount++;
    }
}

const contador1 = new Contador(`Gastón`);

console.log(contador1.obtenerResponsable());
console.log(`Cuenta individual`, contador1.obtenerCuentaIndividual());
contador1.contar();
console.log(`Cuenta individual`, contador1.obtenerCuentaIndividual());
contador1.contar();
console.log(`Cuenta individual`, contador1.obtenerCuentaIndividual());
console.log(`Conteo obtenerCuentaGlobal`, contador1.obtenerCuentaGlobal());
```

## Desafío Nº1: Clases (Desafio1Clases.js)

1) Declarar una clase Usuario

2) Hacer que Usuario cuente con los siguientes atributos:
- nombre: String
- apellido: String
- libros: Object[]
- mascotas: String[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.

3) Hacer que Usuario cuente con los siguientes métodos:
- getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
- addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
- countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
- addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
- getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.
4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.

5) Ejemplos:

- countMascotas: Suponiendo que el usuario tiene estas mascotas: ['perro', 'gato'] usuario.countMascotas() debería devolver 2.
- getBooks: Suponiendo que el usuario tiene estos libros: [{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}] usuario
- getBooks() debería devolver ['El señor de las moscas', 'Fundacion'].
- getFullName: Suponiendo que el usuario tiene: nombre: 'Elon' y apellido: 'Musk' usuario.getFullName() deberia devolver 'Elon Musk'

Solución:
```
class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `Nombre: ${this.nombre} Apellido: ${this.apellido}`;
    }

    addMascota(newMascota) {
        this.mascotas.push(newMascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nameBook, nameAuth) {
        this.libros.push({ nombre: nameBook, autor: nameAuth });
    }

    getBookNames() {
        let bookName = this.libros.map((book) => {
            return book.nombre;
        })

        return bookName;
    }
}

let libros1 = [
    {
        nombre: "Nombre Libro 1",
        autor: "autor1"
    },
    {
        nombre: "Nombre Libro 2",
        autor: "autor2"
    }
];

const mascotas1 = [`mascota1`, `mascota2`, `mascota3`];

const usuario1 = new Usuario(`Gastón`, `Barlocco`, libros1, mascotas1);

console.log(usuario1.getFullName());

console.log(`Total de mascotas`, usuario1.countMascotas());

usuario1.addMascota(`mascota4`);

console.log(`Total de mascotas`, usuario1.countMascotas());

console.log(`libros`, usuario1.getBookNames());

usuario1.addBook(`Nombre Libro nuevo`, `autor nuevo`);

console.log(`libros`, usuario1.getBookNames());

```

## Repaso funciones JS ES6
- Funciones en variables:

```
const mostrarMensaje = function (params){
    console.log(`mensaje: ${params}`);
}
```

- Convirtiendo a funciones flecha...

```
const mostrarMensaje = (params) =>{
    console.log(`mensaje: ${params}`);
}
```

- Cuando la funcion  flecha posee una sola linea, automáticamente se retorna el valor, tener en cuenta si no se desea realizar un retorno: return implícito
-  las llaves {} se vuelven opcionales.

```
const mostrarMensaje = (params) => console.log(`mensaje: ${params}`); 
```

-  Si la función recibe un único parámetro se pueden quitar los paréntesis ()
```
const mostrarMensaje = params => console.log(`mensaje: ${params}`); 
```

-  Si se desea retornar un objeto, el mismo debe estar entre paréntesis:
```
const getPersona = (name, age) => ({nombre: name, edad:age}); 
```

-  Con return:
```
const getPersona = (name, age) => {
   return {nombre: name, edad:age}
}
```
## Callbacks
Los callbacks se utilizan para retomar el flujo de ejecución del programa en caso de que se haya perdido.

- El callback siempre es el último parámetro.
- El callback suele ser una función que recibe dos parámetros.
- La función llama al callback al terminar de ejecutar todas sus operaciones.
- Si la operación fue exitosa, la función llamará al callback pasando null como primer parámetro y si generó algun resutlado este se pasará como segundo parámetro.
- Si la operación resulto en un error, la función llamará al callback pasando el error obtenido como primer parámetro.

Ejemplo: 
```
const operacion = (a, b, accion, callback) => {
    return setTimeout(() => {
        const resultado = accion(a, b);
        callback(null, resultado);
    }, 1000);
}

const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => a / b;
const modulo = (a, b) => a % b;

operacion(2, 4, suma, (err, resultado) => {
    if (err != null) {
        console.error(err);
        return
    } else {
        console.log(`resultado`, resultado);
        console.log(`A partir de aqui retomo el flujo de ejecución de mi programa`)
    }
});

console.log(resultado);

```

## Nomenclatura de ejercicios
Cx_Ex:
- C:clase. 
- E:ejercicio.
- x: número.


## Academy
> [CODERHOUSE](https://www.coderhouse.com.uy)


## Course
> [Node Js](https://www.coderhouse.com.uy/online/programacion-backend)


## Teach & tutor
> <p>Group: 30975.</p>
> <p>Teach: Iram Gutierrez</p>
> <p>Tutor: Gonzalo Moure.</p> 


## Author
> <p>Gastón Barlocco. </p>
> <p>Email: barlocco@hotmail.es </p>

