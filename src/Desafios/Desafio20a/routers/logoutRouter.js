const { Router } = require("express");

const { logout } = require(`../controller/logoutController`);

const logoutRouter = Router();

logoutRouter.get(`/`, logout);

module.exports = logoutRouter;
