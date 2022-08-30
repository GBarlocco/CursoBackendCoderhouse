const { Router } = require(`express`);

const {
    homeController,
    signupController,
    bienvenidaController,
    viewFormAddProductController
} = require(`../controller/generalViewsCotroller`);

const viewsRouter = Router();

//My middleware
const isLogged = ((req, res, next) => {
    let msgError = `Para acceder a esta URL debe iniciar sesión`
    if (req.user) {
        next();
    } else {
        return res.render('viewError', { msgError })
    }
});

viewsRouter.get(`/`,isLogged, homeController);
viewsRouter.get(`/signup`, signupController);
viewsRouter.get('/bienvenida',isLogged, bienvenidaController);
viewsRouter.get('/formAddProduct',isLogged, viewFormAddProductController);

module.exports = viewsRouter;