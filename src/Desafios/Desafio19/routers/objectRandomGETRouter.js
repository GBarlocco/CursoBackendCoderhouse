const { Router } = require("express");

const { getObjectRandom } = require(`../controller/objectRandomGETController`);

const getObjectRandomRouter = Router();

getObjectRandomRouter.get(`/`, getObjectRandom);

module.exports = getObjectRandomRouter;