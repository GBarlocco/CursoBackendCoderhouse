# Desafío 21: TESTEAMOS NUESTRA API REST
## Consigna:
- Revisar en forma completa el proyecto entregable que venimos realizando, refactorizando y reformando todo lo necesario para llegar al esquema de servidor API RESTful en capas planteado en esta clase.

- Asegurarse de dejar al servidor bien estructurado con su ruteo / controlador, negocio, validaciones, persistencia y configuraciones (preferentemente utilizando en la codificación clases de ECMAScript).

- No hace falta realizar un cliente ya que utilizaremos tests para verificar el correcto funcionamiento de las funcionalidades desarrolladas.

- Desarrollar un cliente HTTP de pruebas que utilice Axios para enviar peticiones, y realizar un test de la funcionalidad hacia la API Rest de productos, verificando la correcta lectura de productos disponibles, incorporación de nuevos productos, modificación y borrado.

- Realizar el cliente en un módulo independiente y desde un código aparte generar las peticiones correspondientes, revisando los resultados desde la base de datos y en la respuesta del servidor obtenida en el cliente HTTP.

- Luego, realizar las mismas pruebas, a través de un código de test apropiado, que utilice mocha, chai y Supertest, para probar cada uno de los métodos HTTP de la API Rest de productos.

- Escribir una suite de test para verificar si las respuestas a la lectura, incorporación, modificación y borrado de productos son las apropiadas. Generar un reporte con los resultados obtenidos de la salida del test.

## Solución:
#### Run server: `nodemon server.js`
#### Run server: `nodemon server.js -p (puerto deseado)`
#### Run test - mocha, supertest, chai: `npm test`
[![test-TDD.png](https://i.postimg.cc/RZvqWXWx/test-TDD.png)](https://postimg.cc/8jnT3ddZ)
[![test-BDD.png](https://i.postimg.cc/zv189GWY/test-BDD.png)](https://postimg.cc/CBJ38Ymc)
#### Prueba obtener productos - Axios: `node axiosGetProducts.js`
#### Agregar producto - Axios: `node axiosPostProduct.js`
#### Modificar producto - Axios: ` XXXXXXXXXXX `
#### Eliminar producto - Axios: ` node axiosDeleteProduct.js `


- Nota: para realizar los test el server debe estar corriendo, utilizar dos terminales.

## Software / Plataformas utilizados:
- VSC.
- Postman.
- MongoDB Atlas - nube


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
