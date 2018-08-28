const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const { QA_KEY } = require("../config");

const qaRouter = () => {
  const router = Router();

  router.get("/:target", (req, res) => {
    logEmitter.emit("functionCall", "Routers", "/qa/:target route");
    if (req.query.QA_KEY && req.query.QA_KEY === QA_KEY) {
      const target = req.params.target;
      delete req.query.QA_KEY;
      req.session.cumulativeAnswers = req.query;
      logEmitter.emit(
        "functionSuccessWith",
        "Routes",
        "/qa/:target route",
        target
      );
      res.redirect(`/new/${req.session.council}/${target}`);
    } else {
      logEmitter.emit(
        "functionFail",
        "Routes",
        "/qa/:target route",
        "403 not permitted"
      );
      res.status(403);
      res.send("Not permitted");
    }
  });

  return router;
};

module.exports = { qaRouter };
