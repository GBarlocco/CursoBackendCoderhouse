# Desafío 11: Mocks y normalización.

## Consigna 1:
Sobre el desafío entregable de la clase 16, crear una vista en forma de tabla que consuma desde la ruta ‘/api/productos-test’ del servidor una lista con 5 productos generados al azar utilizando Faker.js como generador de información aleatoria de test (en lugar de tomarse desde la base de datos). Elegir apropiadamente los temas para conformar el objeto ‘producto’ (nombre, precio y foto).

## Consigna 2:
Ahora, vamos a reformar el formato de los mensajes y la forma de comunicación del chat (centro de mensajes).
El nuevo formato de mensaje será:


### Aspectos a incluir en el entregable: 
1. Modificar la persistencia de los mensajes para que utilicen un contenedor que permita guardar objetos anidados (archivos, mongodb, firebase).
2. El mensaje se envía del frontend hacia el backend, el cual lo almacenará en la base de datos elegida. Luego cuando el cliente se conecte o envie un mensaje, recibirá un array de mensajes a representar en su vista. 
3. El array que se devuelve debe estar normalizado con normalizr, conteniendo una entidad de autores. Considerar que el array tiene sus autores con su correspondiente id (mail del usuario), pero necesita incluir para el proceso de normalización un id para todo el array en su conjunto (podemos asignarle nosotros un valor fijo).
Ejemplo: { id: ‘mensajes’, mensajes: [ ] }
4. El frontend debería poseer el mismo esquema de normalización que el backend, para que este pueda desnormalizar y presentar la información adecuada en la vista.
5. Considerar que se puede cambiar el nombre del id que usa normalizr, agregando un tercer parametro a la función schema.Entity, por ejemplo:
const schemaAuthor = new schema.Entity('author',{...},{idAttribute: 'email'});
6. En este schema cambia el nombre del id con que se normaliza el nombre de los autores a 'email'. Más info en la web oficial.  
Presentar en el frontend (a modo de test) el porcentaje de compresión de los mensajes recibidos. Puede ser en el título del centro de mensajes.

#### Nota: 
incluir en el frontend el script de normalizr de la siguiente cdn: https://cdn.jsdelivr.net/npm/normalizr@3.6.1/dist/normalizr.browser.min.js
Así podremos utilizar los mismos métodos de normalizr que en el backend. Por ejemplo:  new normalizr.schema.Entity , normalizr.denormalize(...,...,...)


## Test API - Postman

## Scripts

#### Backend: `nodemon server.js`
Run the application locally
[http://localhost:8080/](http://localhost:8080/)


## Extra
- [Documentation](https://nodejs.org/es/) Nodejs
- [Documentation](https://es.wikipedia.org/wiki/Protocolo_de_transferencia_de_hipertexto) HTTP
- [Documentation](https://www.npmjs.com/package/nodemon) nodemon
- [Documentation](https://expressjs.com/es/) express
- [Documentation](https://www.postman.com) Postman

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


---
<p align='center'>
&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://www.linkedin.com/in/gastón-barlocco-315756148/"><img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" /></a>
</p>
