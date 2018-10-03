const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const backController = require("../controllers/back.controller");

const backRouter = () => {
  const router = Router();

  router.get("/:originator", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/back route");
    const response = backController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers,
      req.session.path
    );
    logEmitter.emit(
      "functionSuccessWith",
      "Routes",
      "/back route",
      `Redirecting to: /new/${req.session.council}${response}`
    );
    res.redirect(`/new/${req.session.council}${response}`);
  });

  return router;
};

module.exports = { backRouter };
