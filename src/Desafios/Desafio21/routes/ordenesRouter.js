const { Router } = require("express");

const {
    viewOrdenesController,
    createOrdenController
} = require("../controller/ordenesController");

const ordenesRouter = Router();

ordenesRouter.get(`/`, viewOrdenesController);
ordenesRouter.post(`/`, createOrdenController);


module.exports = ordenesRouter;



