const { Router } = require(`express`);
const {
    homeController,
    signupController,
    bienvenidaController,
    carritoController
} = require(`../controller/generalViewsCotroller`);

const viewsRouter = Router();

viewsRouter.get(`/`, homeController);
viewsRouter.get(`/carrito`, carritoController);
viewsRouter.get(`/signup`, signupController);
viewsRouter.get('/bienvenida', bienvenidaController);

module.exports = viewsRouter;