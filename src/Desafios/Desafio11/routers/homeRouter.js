const { Router } = require("express");

const { getDataHome } = require(`../controller/homeController`);

const homeRouter = Router();

homeRouter.get(`/`, getDataHome);

module.exports = homeRouter;