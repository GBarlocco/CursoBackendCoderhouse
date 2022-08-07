const { Router } = require("express");

const { userLogin } = require(`../controller/userLoginController`);

const loginRouterPost = Router();

loginRouterPost.post(`/`, userLogin);

module.exports = loginRouterPost;