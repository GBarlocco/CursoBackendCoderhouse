const homeController = ctx => {
    ctx.body = {
        status: `success`,
        message: `Bienvenido al server utilizando Koa!`,
    }
}

module.exports = {
    homeController,
};