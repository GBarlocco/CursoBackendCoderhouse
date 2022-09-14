const compression = require(`compression`);
const { Router } = require("express");

const { info } = require(`../controller/infoController`);

const infoRouter = Router();

infoRouter.get(`/`, compression(), info);

module.exports = infoRouter;