# Reformar para usar GraphQL

Refactoricemos el código del proyecto que venimos trabajando para cambiar de API RESTful a GraphQL API

## Consigna:
- En base al último proyecto entregable de servidor API RESTful, reformar la capa de routeo y el controlador para que los requests puedan ser realizados a través del lenguaje de query GraphQL. 

- Si tuviésemos un frontend, reformarlo para soportar GraphQL y poder dialogar apropiadamente con el backend y así realizar las distintas operaciones de pedir, guardar, actualizar y borrar recursos.

- Utilizar GraphiQL para realizar la prueba funcional de los querys y las mutaciones.

## Solución:
- Run server: nodemon server.
- Realizar consultas localmente: http://localhost:8080/graphql

- Consultas a productos: GraphQL:
```
query getProducts{

  getAllProducts{
    id
    nombre
    stock
  }
}

query getProductByID{
  getProductById (id:"630bf1d635d9b41cf1b901a0"){
    nombre
    stock
  }
}

mutation updateProduct{
  updateProductById(id:"630bf1d635d9b41cf1b901a0", data:{
    nombre: "tuna desde graphql",
    descripcion: "modificada desde graphql",
    codigo: 2,
    thumbnail: "URL desde graphql",
    precio: 333,
    stock: 999
    
  }){
    nombre
    id
  }
}

mutation deleteProduct{
  deleteProductById(id:"633849d19a829f834df23855")
}

```

- Ejemplo getProducts:
[![get-Products.png](https://i.postimg.cc/3RYJ5vwb/get-Products.png)](https://postimg.cc/jW3ryCPz)

- Ejemplo getProductsByID:
[![get-Products-By-ID.png](https://i.postimg.cc/N07B4jx8/get-Products-By-ID.png)](https://postimg.cc/xkCwjYhq)


- Ejemplo updateProduct:
[![update-Product.png](https://i.postimg.cc/Hsqm1yZ4/update-Product.png)](https://postimg.cc/vctkWcdc)


- Ejemplo deleteProductByID:
[![delete-Prodcut.png](https://i.postimg.cc/9Mg38Rw9/delete-Prodcut.png)](https://postimg.cc/BLFwtvgZ)

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
