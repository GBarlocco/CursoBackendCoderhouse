const Router = require(`koa-router`);

const {
    homeController,
} = require("../controller/generalViewsCotroller");

const router = new Router({
    prefix: `/`
});

router.get(`/`, homeController);


module.exports = router;