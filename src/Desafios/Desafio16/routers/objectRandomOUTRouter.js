const { Router } = require("express");

const { outObjectRandom } = require(`../controller/objectRandomOUTController`);

const outObjectRandomRouter = Router();

outObjectRandomRouter.get(`/`, outObjectRandom);

module.exports = outObjectRandomRouter;