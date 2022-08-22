# Desafío 16: LOGGERS, GZIP y ANÁLISIS DE PERFORMANCE
## Consigna:
- Crear un proyecto en Heroku.com para subir el servidor que venimos realizando, reformando todo lo necesario para su correcto funcionamiento en la nube.

- Subir el código a Heroku.com, sin olvidar incluir el archivo .gitignore para evitar subir los node_modules. Comprobar que el proyecto inicie de manera correcta en la nube. Verificar que en su ruta raíz se encuentre la página pública del servidor.

- El servidor debe seguir funcionando en forma local. Realizar un cambio a elección en alguna vista, probar en forma local y subir nuevamente el proyecto a Heroku, verificando que la nueva reforma esté disponible online.

- Revisar a través de una consola local, los mensajes enviados por nuestro servidor en Heroku a su propia consola.

### Solución:
- https://coderhouse-desafio17.herokuapp.com
Importante:

#### CMD: 
- heroku login
- git init
- git remote -v
- heroku git:remote -a coderhouse-desafio17-barlocco
- git add .
- git commit -m "Desafio 17 - Heroku"
- git push heroku master  --> detecta que es una aplicaciones node, genera variables de entorno utilizadas en heroku, etc.
- Disponible en: https://coderhouse-desafio17-barlocco.herokuapp.com/ 

Importante:
- Se debe contar con "start": "node server.js" en package.json


## Software utilizados:
- VSC

## Scripts

#### Backend: `nodemon server.js`
#### Backend: `nodemon server.js -p (puerto deseado)`

Run the application locally
[http://localhost:8080/](http://localhost:8080/) por default


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
