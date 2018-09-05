const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");

const healthcheckRouter = () => {
  const router = Router();

  router.get("/", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/healthcheck route");
    logEmitter.emit("functionSuccess", "Routes", "/healthcheck route");
    res.send("FRONT END healthcheck PASSED");
  });

  return router;
};

module.exports = { healthcheckRouter };
