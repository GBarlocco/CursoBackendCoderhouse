const { Router } = require("express");

const { getForm } = require(`../controller/formController`);

const formRouter = Router();

formRouter.get(`/`, getForm);

module.exports = formRouter;