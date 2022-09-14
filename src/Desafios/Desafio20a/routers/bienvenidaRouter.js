const { Router } = require("express");

const { bienvenida } = require(`../controller/bienvenidaController`);

const bienvenidaRouter = Router();

bienvenidaRouter.get(`/`, bienvenida);

module.exports = bienvenidaRouter;