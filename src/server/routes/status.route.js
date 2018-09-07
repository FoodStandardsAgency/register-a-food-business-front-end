const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const { getStatus } = require("../services/status.service");

const statusRouter = () => {
  const router = Router();

  router.get("/all", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/status/all route");
    const status = getStatus();
    logEmitter.emit("functionSuccess", "Routes", "/status/all route");
    res.send(JSON.stringify(status));
  });

  router.get("/healthcheck", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/status/healthcheck route");
    logEmitter.emit("functionSuccess", "Routes", "/status/healthcheck route");
    res.send("FRONT END healthcheck PASSED");
  });

  router.get("/name/:statusName", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/status/name/:statusName route");
    const statusName = req.params.statusName;
    const status = getStatus(statusName);
    logEmitter.emit(
      "functionSuccess",
      "Routes",
      "/status/name/:statusName route"
    );
    res.send(JSON.stringify(status));
  });

  return router;
};

module.exports = { statusRouter };
