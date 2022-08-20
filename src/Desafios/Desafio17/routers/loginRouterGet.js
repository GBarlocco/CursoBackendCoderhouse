const { Router } = require("express");

const { getLogin } = require(`../controller/loginController`);

const loginRouterGet = Router();

loginRouterGet.get(`/`, getLogin);

module.exports = loginRouterGet;