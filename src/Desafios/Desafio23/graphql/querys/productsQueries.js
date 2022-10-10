const productsQueries = `
getAllProducts: [Product]
getProductById(id: ID!) : Product
`;

module.exports = { productsQueries };