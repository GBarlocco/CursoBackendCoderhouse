const { Router } = require("express");

const { getFaker } = require(`../controller/fakerController`);

const fakerRouter = Router();

fakerRouter.get(`/`, getFaker);

module.exports = fakerRouter;