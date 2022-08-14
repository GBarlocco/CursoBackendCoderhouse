# Desafío 15: servidores con balance de carga

## Consigna:
### 1:
Tomando con base el proyecto que vamos realizando, agregar un parámetro más en la ruta de comando que permita ejecutar al servidor en modo fork o cluster. Dicho parámetro será 'FORK' en el primer caso y 'CLUSTER' en el segundo, y de no pasarlo, el servidor iniciará en modo fork.
- Agregar en la vista info, el número de procesadores presentes en el servidor.
- Ejecutar el servidor (modos FORK y CLUSTER) con nodemon verificando el número de procesos tomados por node.
- Ejecutar el servidor (con los parámetros adecuados) utilizando Forever, verificando su correcta operación. Listar los procesos por Forever y por sistema operativo.
- Ejecutar el servidor (con los parámetros adecuados: modo FORK) utilizando PM2 en sus modos modo fork y cluster. Listar los procesos por PM2 y por sistema operativo.
- Tanto en Forever como en PM2 permitir el modo escucha, para que la actualización del código del servidor se vea reflejado inmediatamente en todos los procesos.
- Hacer pruebas de finalización de procesos fork y cluster en los casos que corresponda.


### 2:
- Configurar Nginx para balancear cargas de nuestro servidor de la siguiente manera:
- Redirigir todas las consultas a /api/randoms a un cluster de servidores escuchando en el puerto 8081. El cluster será creado desde node utilizando el módulo nativo cluster.
- El resto de las consultas, redirigirlas a un servidor individual escuchando en el puerto 8080.
- Verificar que todo funcione correctamente.
- Luego, modificar la configuración para que todas las consultas a /api/randoms sean redirigidas a un cluster de servidores gestionado desde nginx, repartiéndolas equitativamente entre 4 instancias escuchando en los puertos 8082, 8083, 8084 y 8085 respectivamente.

### Aspectos a incluir en el entregable:
- Incluir el archivo de configuración de nginx junto con el proyecto.
- Incluir también un pequeño documento en donde se detallen los comandos que deben ejecutarse por línea de comandos y los argumentos que deben enviarse para levantar todas las instancias de servidores de modo que soporten la configuración detallada en los puntos anteriores.


## Solución:

### Comandos ejecutados - consigna 1:

- Run servidor modo cluster:
```
nodemon server.js --CLUSTER
```


- Run servidor modo FORK:
```
nodemon server.js
nodemon server.js --FORK
```


- Kill proceso Powershell:
```
kill numProceso --> kill 12188
```


- Run/Stop servidor con forever:
```
forever start server.js
forever start server.js --FORK

forever start server.js -p 8081

forever stop server.js
forever stopall
```

- Listar procesos con forever:
```
forever list
```

- Run/Stop servidor pm2:
```
pm2 start server.js
pm2 start server.js --watch
pm2 start server.js -p 8081

pm2 stop server.js

```

- Monitor live:
```
pm2 monit
```

- Logs:
```
pm2 logs
```


- Bajar todos los servicios activos:
```
pm2 delete all 
```


- Lista con servicios activos:
```
pm2 list
```

- Server en modo Cluster:
```
pm2 start server.js -i max
```

- Server en modo cluster escucha activa:
```
pm2 start server.js -i max --watch
```

### Comandos ejecutados / configuraciones - consigna 2:
- descargar stable version / windows: http://nginx.org/en/download.html
- abrir la ruta de la carpeta en CMD: ejecutar: start nginx.exe
- Luego de realizar cambios en el archivo config: nginx.exe -t


## Software utilizados:
- VSC
- MongoDBCompass
- XAMPP
- MySQL Workbench

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
