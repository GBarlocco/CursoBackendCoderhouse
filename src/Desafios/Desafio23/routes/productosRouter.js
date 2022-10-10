const Router = require(`koa-router`);

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProductById,
  deleteProductById,
} = require("../controller/productosControllers");

const router = new Router({
  prefix: `/api/productos`
});


router.get(`/`, getAllProducts);
router.get(`/:id`, getProductById);
router.post(`/`, addProduct);
router.put(`/:id`, updateProductById);
router.delete(`/:id`, deleteProductById);

module.exports = router;