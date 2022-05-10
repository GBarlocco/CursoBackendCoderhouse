# Apuntes - Cursos NodeJs : Tareas de clase & Desafíos

## Introducción
En el siguiente documento se detallarán las tareas realizadas en clase, apuntes, etc.

## Índice:
[EN CONTRUCCIÓN]

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
- El callback suele ser una función que recibe dos parámetros: error & resultado.
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

## Promesas
- Los callbacks fueron una buena práctica adoptada por la comunidad, no era un método de resolución propiamente del lenguaje, actualmente para resolver el problema de los callback of hell surgen las promesas, que si son propios del lenguaje. 

- El estado inicial de una promesa es: pendiente (pending) 

Una vez que la operación contenida se resuelva, el estado de la promesa pasa a ser: 

- Cumplida (resolve): la operación salió bien, y su resultado será manejado por el callback asignado mediante el metodo .then() 

- Rechazada (rejected): la operación fallo, y su error será manejado por el callback asignado mediante el metodo .catch() 

 
Veamos un simple ejemplo: 

```
function dividir (dividendo, divisor){ 

    return new Promise ((resolve, reject) => { 

        if (divisor == 0){ 

            reject (`No se puede dividir entre cero`); 

        } else { 

            resolve (dividendo / divisor); 
        } 
    }) 
} 

```

Veamos el mismo ejemplo manejando el resultado de la función dividir, agregando .then y .catch con su correspondiente callback: 

```
const dividir = (dividendo, divisor) => {
    return new Promise((resolve, reject) => {
        if (divisor == 0) {
            reject(`No se puede dividir entre cero`);
        } else {
            resolve(dividendo / divisor);
        }
    })
}

dividir(10, 2)
    .then((resultado) => {
        console.log(`El resultado de la division es: ${resultado}`);
    })
    .catch((err) => {
        console.log(err);
    }) 

```


## Ejercicio: Clases (C3_E1.js)
Desarrollar una función ‘mostrarLetras’ que reciba un string como parámetro y permita mostrar una vez por segundo cada uno de sus caracteres.  Al finalizar, debe invocar a la siguiente función que se le pasa también  como parámetro: const fin = () => console.log('terminé') Realizar tres llamadas a ‘mostrarLetras’ con el mensaje ‘¡Hola!’ y demoras de 0, 250 y 500 mS verificando que los mensajes de salida se intercalen.

```
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

```


## Ejercicio: Clases (C3_E2.js)
Realizar un programa que:
A) Guarde en un archivo llamado fyh.txt la fecha y hora actual.
B) Lea nuestro propio archivo de programa y lo muestre por consola.
C) Incluya el manejo de errores con try catch (progresando las excepciones con throw new Error).

Aclaración: utilizar las funciones sincrónicas de lectura y escritura de archivos del módulo fs de node.js

```
const fs = require(`fs`);

const date = Date().toLocaleString();

try {
    fs.writeFileSync(`./fyh.txt`, date);

} catch (err) {
    console.error(err);
}

try {
    const date = fs.readFileSync(`./fyh.txt`, `utf-8`);
    console.log(`La fecha actual es ${date}`);
} catch (err) {
    console.error(err);
}

```


## Ejecución sincrónica
- Se ejecutan una por una, desde la primera a la última.
- Se si ejecuta una llamada a otra función, la ejecución se pausa y se procede a ejecutar esa función, al terminar retoma la siguiente instrucción.

Ejemplo:

```
const funA = () => {
    console.log(1);
    funB();
    console.log(2);
}

const funB = () => {
    console.log(3);
    funC();
    console.log(4);
}

const funC = () => {
    console.log(5);
}

funA();

```
Se imprime:
```
1
3
5
4
2
```

## Ejecución asincrónica
- Es muy importante entender y aprender a utilizar las funciones no bloqueantes para no generar nuevos problemas.
- Cuando hablamos de ejecución no bloqueante (asincrónica) solo sabemos en que orden comenzará la ejecución de las intrucciones, pero no sabemos en que momento ni en que orden terminarán de ejecutarse.


## Comportamiento de una función
La misma puede ser bloqueante o no-bloqueante, si alguna de las instrucciones dentro de una función intente acceder a un recurso que se encuentre fuera del programa se observará dicho comportamiento.

### Bloqueante o no-bloqueante = síncrona o asíncrona.
Es muy importante saber como va a funcionar el programa, conocer que características tienen las funciones para poder utilizar el mejor mecanismo a la hora de controlar el flujo del programa. Que una función sea bloqueante no es algo negativo, puede ser necesario que el sistema necesite esperar por ello, o no, lo importante es conocer las características y utilizar el mejor mecanismo para controlar el flujo del programa.

Ejemplo: programa bloqueante / síncrono:

```
const delay = ret => {for(let i=0; i<ret*3e6; i++);}
function hacerTarea(num) {
    console.log('haciendo tarea ' + num)
    delay(100)
}
console.log('inicio de tareas');
hacerTarea(1)
hacerTarea(2)
hacerTarea(3)
hacerTarea(4)
console.log('fin de tareas')
console.log('otras tareas ...')

```

Se imprime:

```
Inicio de tareas
Haciendo tarea 1
Haciendo tarea 2
Haciendo tarea 3
Haciendo tarea 4
Fin de tareas
Otras tareas …
```
Como se puede ver, es un programa bloqueante

Recordar que en los métodos asincrónicos (no bloqueante) se pierde el flujo del programa, para recuperar y controlar el mismo se utilizan los callback.


## Manejo de errores:

### Funciones síncronas / bloqueantes: 
- try / catch

### Funciones asincrónicas / no-bloqueantes:
-	Callback: callback manejamos el error, entonces no se utiliza try & catch.
-	Promesas: resolve / reject -> then / catch
-	Async / await : se manejan promesas de forma bloqueantes, para ello se agrega try & catch


## Servidores Web

### Protocolo HTTP
- Protocolo utilizado en internet para tranferrir datos.
- HTTP = Hypertext Transfer Protocol.
- Protocolo de estructura cliente-servidor: Cliente realiza una petición, el servidor responde.
- HTTP establece varios tipos de peticiones, siendo las principales: POST, GET, PUT, DELETE.
- En Node.js existe un módulo nativo.

#### HTTP: códigos de estado
Cada mensaje de respuesta HTTP tiene un código de estado numérico de tres cifras que indica el resutlado de la petición:
- 1xx(informativo): la petición fue recibida, y continúa su procesamiento.
- 2xx (Éxito): la petición fue recibida con éxito, comprendida y procesada.
- 3xx (Redirección): más acciones con requeridas para completar la petición. Utiliza la información que tenía previamente.
- 4xx (Erro del cliente): la petición tiene algún error, y no puede ser procesada.
- 5xx (Error del servidor): el servidor falló al intentar procesar una petición aparentemenete válida.

### Ejercicio : creación de un servidor web con módulo nativo: C6_E1.js
Desarrollar un servidor en node.js que escuche peticiones en el puerto 8080 y responda un mensaje de acuerdo a la hora actual: 
- Si la hora actual se encuentra entre las 6 y las 12 hs será 'Buenos días!'.
- Entre las 13 y las 19 hs será 'Buenas tardes!'. 
- De 20 a 5 hs será 'Buenas noches!'.
Se mostrará por consola cuando el servidor esté listo para operar y en qué puerto lo está haciendo.

```
const http = require (`http`);

const server = http.createServer((req, res) =>{
    const  date = (new Date()).getHours();
    
    date >= 6 && date <12 ? res.end(`Buenos días!`) : null;
    
    date >= 12 && date <19 ? res.end(`Buenos tardes!`) : null;
    
    date >= 20 ? res.end(`Buenos noches!`) : null;
    
})

const connectedServer = server.listen(8080, () =>{
    console.log(`Servidor HTTP escuchando en el puerto ${connectedServer.address().port}`);
})
```

### Servidor HTTP en Express
NodeJS cuenta con módulos nativos para manejar el envío y recepción de peticiones de tipo http/s, sin embargo, usaremos para nuestra aplicación un módulo externo llamado express
Características:
- Muy utilizado por la comunidad, facil de utilizar.
- Facilita la tarea de crear los distintos puntos de entrada de nuestro servidor.
- Permite personalizar la manera en que se maneja cada petición en forma más simple y rápida.
- Express nos permite definir, para cada tipo de petición HTTP que llegue a una determinada URL, qué acciones debe tomar, mediante la definición de un callback para cada caso que consideremos necesario incluir en nuestra API.


Instalación:
```
npm install express

```

### Despliegue en la nube
[EN CONTRUCCIÓN]

### API
Las API son conjuntos de definiciones y protocolos que se utilizan para diseñar e integrar el software de las aplicaciones.Suele considerarse como el contrato entre el proveedor de información y el usuario, donde se establece el contenido que se necesita por parte del consumidor (la llamada) y el que requiere el productor (la respuesta).Por ejemplo, el diseño de una API de servicio meteorológico podría requerir que el usuario escribiera un código postal y que el productor diera una respuesta en dos partes: la primera sería la temperatura máxima y la segunda, la mínima.

En resumen: funcionalidad de un sistema que esta expuesta para ser consumida por otro componente.

### REST
- REpresentational State Transer = Transferencia de Estado Representacional.
- Representación -> nos referimos a un modelo o estructura con la que representamos algo.
- Estado -> nos referimos a los datos que contiene ese modelo estructura.
- Transferir un Estado de Representación implica el envío de datos (con una determinada estructura) entre dos partes.
- Los dos formatos más utilizados: XML y JSON.

### RESTFul
Cuando hablamos de aplicaciones RESTFul, nos referimos a aplicaicones que operan en forma de servicios web, respondiendo consultas a otros sistemas a través de internet. Dichas aplicaciones lo hacen respetando algunas reglas y convenciones.

### API REST
- Tipo de API que no dispone de interfaz gráfica.
- Se utiliza exclusivamente para comunicación entre sistemas, mediante el protocolo HTTP.
Para que una API se considere REST debe cumplir con las siguientes características:
- Arquitectura cliente - servidor sin estado.
- Cacheable.
- Operaciones comunes.
- Interfaz uniforme.
- Utilización de hipermedios.

A continuación, explicaremos lo anteriormente nombrado.

#### Arquitectura cliente - servidor sin estado:
- Cada mensaje HTTP contiene toda la información necesaria para comprender la petición.
- Ni el cliente ni el servidor necesitan recordar ningún estado de las comunicaciones entre mensajes.
- El cliente y el servidor se encuentran débilmente acoplados ya que el cliente no necesita conocer los detalles de implementaciñon del servidor y el servidor se "despreocupa" de cómo son usados los datos que envía al cliente.


## Desafíos:

### Desafío Nº1: Clases (Desafio1Clases.js)
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

### Desafío Nº2:

```
const fs = require('fs');

class Contenedor {
    constructor(archivo) {
        this.archivo = archivo;
    }

    async read() {
        try {
            let data = await fs.promises.readFile(`./${this.archivo}`, `utf-8`);
            return data;

        } catch (err) {
            throw Error(`Error al leer el archivo ${err}`);
        }
    }

    async write(datos, msg) {
        try {
            await fs.promises.writeFile(`./${this.archivo}`, JSON.stringify(datos, null, 2));
            console.log(msg);
        } catch (err) {
            throw Error(`Error al escribir en el archivo ${err}`);
        }
    }

    async save(product) {
        let newId = 1;
        let newProduct = {};

        let data = await this.read();
        let datos = JSON.parse(data);

        if (!data) {
            product.id = newId;
            newProduct = [product];
        } else {
            product.id = datos[datos.length - 1].id + 1;
            newProduct = product;
        }
        datos.push(newProduct);

        await this.write(datos, `Agregado!`);
    }

    async getById(myId) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let result = datos.filter(product => product.id == myId);
        return result;
    }

    async getAll() {
        let data = await this.read();
        let datos = JSON.parse(data);

        return datos;
    }

    async deleteById(myId) {
        let data = await this.read();
        let datos = JSON.parse(data);

        let product = datos.find(product => product.id == myId);
        if (product) {
            let index = datos.indexOf(product);
            console.log(index);
            datos.splice(index, 1);
            await this.write(datos, `Producto con ID: ${myId} eliminado`);
        } else {
            console.log(`Producto con ID: ${myId} no existe`);
        }
    }

    async deleteAll() {
        let data = [];
        await this.write(data, `Se eliminaron todos los productos`);
    }
}
module.exports = Contenedor;

/*
let contenedor = new Contenedor(`/productos.txt`);

async function test() {
    const newProduct = {
        title: `Producto`,
        price: 11111,
        thumbnail: `link`
    };
    await contenedor.save(newProduct);

    console.table(await contenedor.getById(2));

    console.table(await contenedor.getAll());

    await contenedor.deleteById(7);
}
test();
*/
```


### Desafío Nº3:

```
const express = require(`express`);

const Contenedor = require(`../Desafio2/Desafio2.js`);

const app = express();

const PORT = 8080;

let myContenedor = new Contenedor(`productos.txt`);

app.get(`/`, (req, res) => {
    res.send(`<h3> Desafío Nº3 - Servidores Web </h3>`);
});

app.get(`/productos`, (req, res) => {
    ; (async () => {
        try {
            let data = await myContenedor.getAll();
            res.send(data);
        } catch (err) {
            console.error(err);
        }
    })();
});

app.get(`/productoRandom`, (req, res) => {
    ; (async () => {
        try {
            let allData = await myContenedor.getAll();
            let random = Math.trunc(Math.random() * ((allData.length) - 0) + 0);
            let dataRandom = await myContenedor.getById(random);
            res.send(dataRandom);
        } catch (err) {
            console.error(err);
        }
    })();
});

const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on(`Error`, (error) => console.log(`Error en servidor: ${error}`));
```

## Comandos útiles

### Git & GitHub:
[EN CONTRUCCIÒN]
```
git add .
git commit -m "mensaje"
git push -u origin master 
```
###  package.json
Para generar la dependencia package.json:

```
npm init -y
```

### Nodemon:
Relanzado de la ejecución de Node.js cuando algún archivo cambia en el proyecto.

Instalación:
```
npm i -g nodemon
```

Ejecutar proyecto de interés:
```
nodemon nombreArchivo.js
```




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

