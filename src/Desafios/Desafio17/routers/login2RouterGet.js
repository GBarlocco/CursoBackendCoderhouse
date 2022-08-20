const { Router } = require("express");

const { login2Get } = require(`../controller/login2Controller`);

const login2GetRouter = Router();

login2GetRouter.get(`/`, login2Get);

module.exports = login2GetRouter;