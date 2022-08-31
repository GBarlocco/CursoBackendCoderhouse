const { Router } = require("express");

const {
  getAllProductsByIdCart,
  createCart,
  viewCart,
  addProductToCart,
  deleteCartById,
  deleteProductById,
} = require("../controller/carritoController");

const carritoRouter = Router();
carritoRouter.get(`/:id/productos`, getAllProductsByIdCart);
carritoRouter.get(`/`, viewCart);
carritoRouter.post(`/`, createCart);
carritoRouter.post(`/addProduct`, addProductToCart);
carritoRouter.post(`/deleteProduct`, deleteProductById);
/*
    NOTA:
        -Se deja la lógica en el programa, en este entregable se decidió generar el carrito en el usuario.
        -Se agregaron las ordenes
*/
//carritoRouter.post(`/:idCar/:idProd`, addProductToCart);
//carritoRouter.delete(`/:id/productos/:id_prod`, deleteProductById);

carritoRouter.delete(`/:id`, deleteCartById);


module.exports = carritoRouter;



