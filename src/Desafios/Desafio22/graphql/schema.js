const { buildSchema } = require(`graphql`);
const { productType } = require(`../graphql/types/productType`);

const { productInput } = require(`../graphql/inputs/productInput`);

const { productsQueries } = require(`../graphql/querys/productsQueries`);
const { productsMutation } = require(`../graphql/mutations/productsMutation`);


//Input: lo que necesitamos para la creación.
//Query: lo relacionado con consulta de lectura. --> get
// Mutation: lo relacionado con consultas de escritura. --> post, put, delete

const schema = buildSchema(`
${productType}

${productInput}

type Query {
    ${productsQueries}
}

type Mutation {
    ${productsMutation}
}

`);

module.exports = schema;


/* 
consulta desde http://localhost:8080/graphql

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
  deleteProductById(id:"63361c43462b55153972a06f")
}

*/