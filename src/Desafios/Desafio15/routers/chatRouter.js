const { Router } = require("express");

const { getChat } = require(`../controller/chatController`);

const chatRouter = Router();

chatRouter.get(`/`, getChat);

module.exports = chatRouter;