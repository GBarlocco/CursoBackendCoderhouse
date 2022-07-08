const { Router } = require("express");

const {
  getAllProductsByIdCart,
  createCart,
  addProduct,
  deleteCartById,
  deleteProductById
} = require("../controller/carritoController");

const carritoRouter = Router();

carritoRouter.get(`/:id/productos`, getAllProductsByIdCart);
carritoRouter.post(`/`, createCart);
carritoRouter.post(`/:idCar/:idProd`, addProduct);
carritoRouter.delete(`/:id`, deleteCartById);
carritoRouter.delete(`/:id/productos/:id_prod`, deleteProductById);

module.exports = carritoRouter;



