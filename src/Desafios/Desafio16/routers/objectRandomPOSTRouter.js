const { Router } = require("express");

const { postObjectRandom } = require(`../controller/objectRandomPOSTController`);

const postObjectRandomRouter = Router();

postObjectRandomRouter.post(`/`, postObjectRandom);

module.exports = postObjectRandomRouter;