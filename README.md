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


#### Iniciar servidor con express:
1) Requerimos la librería express:

```
const express = require(`express`);
const app = express();
```

2) configuramos el servidor, para que escuche un puerto:

```
const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando puerto ${PORT}`);
});

```

3) configuramos el error:
```
server.on(`error`, err => {
    console.log(`error en el servidor: ${err}`)
})

```

### Despliegue en la nube
[EN CONTRUCCIÓN]

### API
Las API son conjuntos de definiciones y protocolos que se utilizan para diseñar e integrar el software de las aplicaciones.Suele considerarse como el contrato entre el proveedor de información y el usuario, donde se establece el contenido que se necesita por parte del consumidor (la llamada) y el que requiere el productor (la respuesta).Por ejemplo, el diseño de una API de servicio meteorológico podría requerir que el usuario escribiera un código postal y que el productor diera una respuesta en dos partes: la primera sería la temperatura máxima y la segunda, la mínima.

- En resumen: funcionalidad de un sistema que esta expuesta para ser consumida por otro componente.

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

#### Cacheable:
- Debe admitir un sistema de almacenamiento en caché.
- Dicho almacenamiento evita repetir varias conexiones entre el servidor y el cliente en caso de que la peticiones idénticas fueran a generar la msima respuesta. Lo informa mediante HTTP status, código: 304.
 
#### Operaciones comunes:
- Todos los recursos detrás de una API seben poder ser consumidos mediante peticiones HTTP, las principales: POST, GET, PUT y DELETE.
- Operaciones CRUD: Create, Read, Update, Delete.
- Se devolverá el código de estado para informar el resultado de la operación.

#### Interfaz uniforme:
- Cada acción debe contar con una URI: identificador único.
- URI nos facilitará el acceso a la información para consultar, modificar, eliminar.
- ejemplo de URI: http://servicio/api/usuario/1

#### Utilización de hipermedios:
- Cada vez que se hace una petición al servidor y este devuelve una respuesta, parte de la información devuelta pueden ser hipervínculos de navegación a otro recurso del cliente.
- Se puede navegar de un recurso REST a muchos otros.


### Express: atención de peticiones:
- Peticiones: get(), post(), felete() y put().
- Todos reciben como primer argumento la ruta (URI), y el segundo parámetro un callback con el que maneja la petición. La petición posee dos parámetros: primero la petición (request) y el segundo la respuesta (response).

#### Ejemplo get():

- URI: /api/mensajes/
- Método: get.

```
app.get(`/api/mensajes/`, (req, res) => {

});
```

#### Ejemplo de petición con parámetros de búsqueda:

```
const express = require(`express`);

const app = express();

const messages = [
    {
        id: 1,
        title: `OK`,
        message: ``
    },
    {
        id: 2,
        title: `NOK`,
        message: ``
    },
];

app.get(`/api/mensajes/`, (req, res) => {
    console.log(`Request recibido`);

    if (!req.query.title) {
        return res.json(messages);
    }

    const messageFilttered = messages.filter(message => message.title === req.query.title);
    return res.json(messageFilttered);

});



const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando puerto ${PORT}`);
});

server.on(`error`, err => {
    console.log(`error en el servidor: ${err}`)
})
```

#### Ejemplo de petición GET con identificador
En caso de que se quiera acceder a un recurso en particular ya conocido, es necesario enviar un identificador unívoco en la URL:

- Agregamos en el código anterior: 

```
app.get(`/api/mensajes/:id`, (req, res) => {
    console.log(`Request recibido /api/mensajes/:id`);

    const id = Number(req.params.id);
    console.log(`id: ${id}`);

    const messageFilttered = messages.find(message => message.id === id);

    if (!messageFilttered) {
        return res.status(404).json({
            error: `mensaje no encontrado`
        });
    };

    return res.json(messageFilttered);
});
```

#### Ejercicio - Get endpoints - APIRest (E1_C7.js)
Dada la siguiente constante: const frase = 'Hola mundo cómo están'
Realizar un servidor con API Rest usando node.js y express que contenga los siguientes endpoints get:

1) '/api/frase' -> devuelve la frase en forma completa en un campo ‘frase’.
2) '/api/letras/:num  -> devuelve por número de orden la letra dentro de esa frase (num 1 refiere a la primera letra), en un campo ‘letra’.
3) '/api/palabras/:num  -> devuelve por número de orden la palabra dentro de esa frase (num 1 refiere a la primera palabra), en un campo ‘palabra’.

```
// EJERCICIO APIRest

const express = require(`express`);

const app = express();

const frase = `Hola como estas`;

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando puerto: ${PORT}`);
});

//1)
app.get(`/api/frase`, (req, res) => {
    return res.json(frase);
});

//2)
app.get(`/api/letras/:num`, (req, res) => {
    if (req.params.num > frase.length - 1) {
        return res.status(404).json({
            error: `letra no encontrada`
        });
    }

    if (isNaN (req.params.num)) {
        return res.status(404).json({
            error: `El parámetro ingresado debe ser un número`
        });
    }

    const letra = frase.charAt(req.params.num);
    console.log(letra);
    return res.json(letra);
})

//3
app.get(`/api/palabras/:num`, (req, res)=>{
    const num = req.params.num;
    const palabrasArray = frase.split(` `);

    if (req.params.num > palabrasArray.length - 1) {
        return res.status(404).json({
            error: `Palabra no encontrada, excede la cantidad máxima`
        });
    }

    if (isNaN (req.params.num)) {
        return res.status(404).json({
            error: `El parámetro ingresado debe ser un número`
        });
    }

    return res.json(`la palabra seleccionada es: ${palabrasArray[num]}`);

});

```


#### Recibir mensajes en formato JSON
Para que nuestro servidor pueda interpretar mensajes JSON se debe indicar de forma explícita, para ello agregamos las siguientes lineas de código:

```
app.use(express.json());   -> req.body contendra el contenido.
app.use(express.urlencoded({ extended: true }));
```

#### Postman
Se utiliza para realizar todo tipo de peticiones HTTP a una API, desde el navedador solo podremos arealizar (de forma simple) peticiones get.


#### meotodo POST (enviar)
Sumemos el siguiente código al ejemplo de clase:

```
app.post(`/api/mensajes`, (req, res) => {
    console.log(`POST request recibido`);
    console.log({ body: req.body })

    const newMessage = req.body;
    newMessage.id = messages.length + 1;

    messages.push(newMessage);

    return res.status(201).json(newMessage);

});
```

#### meotodo PUT (actualizar)
```
app.put(`/api/mensajes/:id`, (req, res) => {
    console.log(`PUT request recibido`);

    const id= Number(req.params.id);
    const messageIndex = messages.findIndex(message => message.id === id);

    if (messageIndex < 0){
        return res.status(401).json({
            error: "mensaje no encontrado"
        });
    }

    const body = req.body;

    messages[messageIndex].title = body.title;
    messages[messageIndex].message = body.message;

    return res.json(messages[messageIndex]);

});
```

#### meotodo DELETE (borrar):
En este caso filtraremos el array, dejando afuera el elemento a borrar y retornaremos status 204 (sin contenido).
```
app.delete(`/api/mensajes/:id`, (req, res) => {
    console.log(`DELETE request recibido`);

    const id= Number(req.params.id);
    const messageIndex = messages.findIndex(message => message.id === id);

    if (messageIndex < 0){
        return res.status(401).json({
            error: "mensaje no encontrado"
        });
    }

    messages = messages.filter(message => message.id != id);

    return res.status(204).json({});
});
```















## FALTA PUNTEO DE TEMAS CLASE 1 - 7
Conceptos para ordenar dentro de las clases anteriores:


¿Qué es ruta absoluta y relativa?
Ruta absoluta: se indica toda la ruta del archivo incluyendo el directorio raíz. 
Por ejemplo, C:\carpeta1\carpeta2\archivo1. doc. Ruta relativa: se indica la ruta a partir de donde este en ese momento situado.

middleware
Un Un middleware es un bloque de código que se ejecuta entre la petición que hace el usuario (request) hasta que la petición llega al servidor. Es inevitable utilizar middlewares en una aplicación en Node. es un bloque de código que se ejecuta entre la petición que hace el usuario (request) hasta que la petición llega al servidor. 
Es inevitable utilizar middlewares en una aplicación en Node.

APIRest
Sistema para proporcionar informaciòn mediante endpoints, devolvemos json



## Clase Nº8 - Router & Multer:
Resumen de puntos dictados:
- Ruteo en Express: nos sirve para asociar un ruteo a entidades que poseen el mismo nombre.
- Ruteo: contenido estático(imagenes, txt, videos, documentos, JavaScript, etc) y dinámico.
- Ruta relativa & ruta absoluta: __dirname.
- Middleware: un middleware es un bloque de código que se ejecuta entre la petición que hace el usuario (request) hasta que la petición llega al servidor. Es inevitable utilizar middlewares en una aplicación en Node. Se puede relacionar con .then de la promesas, el then equivale al next, permitiendo pasar al siguiente middleware. Existen muchos tipos de middleware: a nivel de aplicación, router, manejod de errores, incorporado, de terceros. En resumen: se utilizan para dirigir el flujo del programa.
- Multer: middleware de express, nos permite subir archivos a un servidor.


## Clase Nº9 - Motores de plantillas
Resumen de puntos dictados:
- Motor de plantilla: herramienta que nos permite transformar pseudo codigo HTML en HTML-
- MVC: modelo vista controlador, se trata de separar los datos de su presentación. Separar el front del back. Las plantillas (templates) son una aproximación más para resolver este problema.
- MVC es una forma de separar nuestro codigo en capas, haciendo que cada capa se ocupe de una sola cosa, para que este mas organizado y sea mas legible.
- MVC vs API: un cliente HTTP puede consumir la API, MVC posee vista la API no.
- Los motores de plantillas hoy en dia no se utilizan tanto.
- Template + input data = templating Engine, templating Engine entrega el Output
- Ventajas y desventajas de utilizar motores de plantillas.
- Instalar npm i -g http-server para correr servidor. Para correr desde nodeJs: http-server .    .=propia carpeta del proyecto.
- Creación de motor de plantilla custom para express.
- Handlebars: lenguaje de plantillas simples, tienen aspecto de texto normal con expresiones de Handlebars se componen de {{ + algunos contenidos +}}. Se puede utilizar del lado del servidor y del cliente.
- Para utilizar handlebars --> npm install express-handlebars


## Clase Nº10 - Pug & Ejs
Resumen de puntos dictados:
- Pug es un motor de plantillas
- Para instalar pug: npm install pug
- Pug se basa en la tabulación para interpretar etiquetas.
- EJs es un motor de plantilla, es el más utilizado. Se puede utilizar en el servidor o en el cliente. Instalar npm install ejs. 
- Se deben utilizar sintáxis básicas propias de Ejs.
- Para instalar EJs: npm install ejs
- Sintaxis básica de Ejs: <%= incrusta en la plantilla el valor tal cual está, <%- incrusta en la plantilla el valor renderizado como HTML, <% Scriptlet admite instrucciones en JS para declaración de variables y control de flujo.
- El modelo MVC es muy utilizado para realizar el front desde el back.


## Clase Nº11 -  Websockets
Resumen de puntos dictados:
- Comunicaciòn entre el back y el front: API --> el cliente se encarga 100% en mostrar los datos que enviamos por Json, MVC--> se encuentra todo integrado en el mismo sistema.
- Websockets: protocolo para intercambiar información mediante TCP, en HTPP contabamos con arquitectura cliente servidor, aqui tendremos tambien arquitectura cliente servidor pero en forma de red, red de clientes conectados a un servidor de websockets. La comunicación entre servidor y cliente es bidireccional, a diferencia de HTTP.
- Con Websocket se obtienen los datos de una forma mas rápida, comunicación directa y en tiempo real. Se genera una única comunicación, una vez que se realizó la primer conexión el cliente y el servidor quedan enlazados, no deben inicializar nuevamente.
- Las notificaciones push --> se recomienda utilizar websockets, por ejemplo chat, información en tiempo real.
- Recordar: HTTP esta limitado a la petición del cliente, con websocket tenemos mayor flexibilidad para determinadas aplicaciones. 
- microservicio: Backend pequeño que se encarga de una tarea. Los microservicios estan separados, comparten información entre ellos.
- Librería para trabajar con websocket: socket.io


## Clase Nº12 -  Aplicación chat con Websocket
Resumen de puntos dictados:
- Un websocket es solo una conexión TCP que permite la comunicación full-duplex, lo que significa que cualquier lado de la conexión puede enviar datos al otro, incluso al mismo tiempo.
- Envio de mensaje: socket.emit
- Envio de mensaje a todos los clientes conectados: io.sockets.emit
- Envio de mensaje a todos los clientes a excepción de quien envió el mensaje original: socket.broadcast.emit


## Clase Nº13 - Node.js como herramienta de desarrollo
- typeScript


## Clase Nº14 - Webpack: Module Bundler
- Webpack es un empaquetador, nos reduce al minimo el código fuente que vamos a colocar en producción.



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

