const { Router } = require("express");

const { errorLog } = require(`../controller/errorLogController`);

const errorLogRouter = Router();

errorLogRouter.get(`/`, errorLog);

module.exports = errorLogRouter;