const { Router } = require("express");

const { errorSignup } = require(`../controller/errorSignupController`);

const errorSignupRouter = Router();

errorSignupRouter.get(`/`, errorSignup);

module.exports = errorSignupRouter;