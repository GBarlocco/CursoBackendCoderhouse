const { Router } = require(`express`);
const {
    homeController,
    signupController,
    bienvenidaController,
} = require(`../controller/generalViewsCotroller`);

const viewsRouter = Router();

viewsRouter.get(`/`, homeController);
viewsRouter.get(`/signup`, signupController);
viewsRouter.get('/bienvenida', bienvenidaController);

module.exports = viewsRouter;