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
carritoRouter.post(`/:idCar/:idProd`, addProductToCart);
carritoRouter.delete(`/:id`, deleteCartById);
carritoRouter.delete(`/:id/productos/:id_prod`, deleteProductById);

carritoRouter.post(`/addProduct`, addProductToCart);

module.exports = carritoRouter;



