/**
 * The trading status router triggers the backend API call to set the trading status
 * and redirects to the trading status confirmation page.  Note validation is expected to
 * be handled in the backend.
 * Routes: /tradingstatus/stilltrading/:fsaid
 * /tradingstatus/nolongertrading/:fsaid
 * @module routers/trading-status
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const { tradingStatus } = require("../services/trading-status.service");

const tradingStatusRouter = () => {
  const router = Router();

  router.get("/stilltrading/:fsaid", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/tradingstatus/stilltrading/:fsaid route");
    try {
      const fsaId = req.params.fsaid;
      const encryptedId = req.query.token;
      let result = await tradingStatus(fsaId, encryptedId, true);
      if (result.status && result.status === 200) {
        res.render("trading-status-still-trading");
      } else {
        throw new Error(`Trading Status API returned unexpected response status ${result.status}`);
      }
    } catch (err) {
      logEmitter.emit(
        "functionFail",
        "Routes",
        "/tradingstatus/stilltrading/:fsaid route",
        err.message
      );
      next(err);
    }
  });

  router.get("/nolongertrading/:fsaid", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/tradingstatus/nolongertrading/:fsaid route");
    try {
      const fsaId = req.params.fsaid;
      const encryptedId = req.query.token;
      let result = await tradingStatus(fsaId, encryptedId, false);
      if (result.status && result.status === 200) {
        res.render("trading-status-no-longer-trading");
      } else {
        throw new Error(`Trading Status API returned unexpected response status ${result.status}`);
      }
    } catch (err) {
      logEmitter.emit(
        "functionFail",
        "Routes",
        "/tradingstatus/nolongertrading/:fsaid",
        err.message
      );
      next(err);
    }
  });

  return router;
};

module.exports = { tradingStatusRouter };
