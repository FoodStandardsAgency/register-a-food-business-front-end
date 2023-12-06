/**
 * The status router returns status data - all statuses, a specified status name, or a simple healthcheck (alive/not alive).
 * Routes: /status/all, /status/healthcheck, /status/name/:statusName
 * @module routers/status
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const { getStatus } = require("../services/status.service");

const statusRouter = () => {
  const router = Router();

  router.get("/all", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/status/all route");
    try {
      const status = await getStatus();
      logEmitter.emit("functionSuccess", "Routes", "/status/all route");
      res.send(JSON.stringify(status));
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/status/all route", err);
      next(err);
    }
  });

  router.get("/healthcheck", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/status/healthcheck route");
    logEmitter.emit("functionSuccess", "Routes", "/status/healthcheck route");
    res.send("FRONT END healthcheck PASSED");
  });

  router.get("/name/:statusName", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/status/name/:statusName route");
    try {
      const statusName = req.params.statusName;
      const status = await getStatus(statusName);
      logEmitter.emit("functionSuccess", "Routes", "/status/name/:statusName route");
      res.send(JSON.stringify(status));
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/status/name/:statusName route", err);
      next(err);
    }
  });

  return router;
};

module.exports = { statusRouter };
