const Router = require(`koa-router`);

const {
    viewOrdenesController,
    createOrdenController
} = require("../controller/ordenesController");


const router = new Router({
    prefix: `/api/ordenes`
});


router.get(`/`, viewOrdenesController);
router.post(`/`, createOrdenController);


module.exports = router;



