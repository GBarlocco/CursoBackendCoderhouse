const { Router } = require("express");

const { signup2 } = require(`../controller/signup2Controller`);

const signup2Router = Router();

signup2Router.get(`/`, signup2);

module.exports = signup2Router;
