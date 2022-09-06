const { Router } = require("express");

const { info } = require(`../controller/infoControllerCompression`);

const infoRouter = Router();

infoRouter.get(`/`, info);

module.exports = infoRouter;