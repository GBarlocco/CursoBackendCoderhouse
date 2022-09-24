const { Router } = require("express");

const {
    getAllProductsTest,
    addProductTest,
    deleteProductByIdTest,
    updateProductByIdTest
} = require("../controller/productosControllers");

const productosRouterTest = Router();

//Test
productosRouterTest.get(`/`, getAllProductsTest);
productosRouterTest.post(`/`, addProductTest);
productosRouterTest.put(`/:id`, updateProductByIdTest);
productosRouterTest.delete(`/:id`, deleteProductByIdTest);


module.exports = productosRouterTest;