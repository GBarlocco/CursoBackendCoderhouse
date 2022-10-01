//Input: lo que necesitamos para la creación.

const productInput = `
input ProductInput {
    nombre: String!,
    descripcion: String!,
    codigo: Float!,
    thumbnail: String!,
    precio: Float!,
    stock: Float!,
}`;

module.exports = { productInput };