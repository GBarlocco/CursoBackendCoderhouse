# Ejemplo con proxy inverso levantando microservicios - backend

## ¿Cómo funciona el ejemplo?
En el siguiente ejemplo se mostrarà un servidor (index.js) con un proxy inverso, en el cual reddireccionará las consultas de:
- http://localhost:3000/users --> http://localhost:8081/users
- http://localhost:3000/users --> http://localhost:8082/products
De esta manera estamos ocultando el acceso a la consulta de users & products.

Debemos levantar el servidor (index.js):
- pm2 start index.js --name="proxy" --watch 

Luego levantamos los microservicios:
- pm2 start users.js --name="users" --watch -- 8081
- pm2 start products.js --name="products" --watch -- 8082

## Comandos utilizados:
- pm2 start index.js --name="proxy" --watch 
- pm2 stop index.js --name="proxy"
- pm2 start users.js --name="users" --watch 
- pm2 stop users.js --name="users"
- pm2 start products.js --name="products" --watch 
- pm2 stop products.js --name="products"
- pm2 logs

## Librerias instaladas:
- express
- nodemon
- http-proxy-middleware

