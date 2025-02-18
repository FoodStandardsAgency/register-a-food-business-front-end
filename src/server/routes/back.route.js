/**
 * The back router redirects users to the previous page in the path, regardless of the browser history.
 * Routes: /back/:originator
 * @module routers/back
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const backController = require("../controllers/back.controller");

const backRouter = () => {
  const router = Router();

  router.get("/:originator", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/back route");
    const response = backController(
      `/${req.params.originator}`,
      req.session.cumulativeFullAnswers,
      req.session.pathConfig
    );
    req.session.validatorErrors = [];
    logEmitter.emit(
      "functionSuccessWith",
      "Routes",
      "/back route",
      `Redirecting to: /new${response}`
    );
    res.redirect(`/new${response}`);
  });

  return router;
};

module.exports = { backRouter };
