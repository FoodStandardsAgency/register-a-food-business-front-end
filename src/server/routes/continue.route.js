/**
 * The continue router redirects the user to the next page in the path, based on their cumulative answers
 * Routes: /continue/:originator
 * @module routers/continue
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const continueController = require("../controllers/continue.controller");

const continueRouter = () => {
  const router = Router();

  router.post("/:originator", (req, res) => {
    logEmitter.emit(
      "functionCallWith",
      "Routes",
      "/continue route",
      `Originator: ${req.session.council}/${req.params.originator}`
    );

    const response = continueController(
      `/${req.params.originator}`,
      req.session.cumulativeFullAnswers,
      req.body,
      req.session.switches,
      req.session.pathConfig.path
    );

    req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;
    req.session.validatorErrors = response.validatorErrors;
    req.session.switches = response.switches;

    logEmitter.emit(
      "functionSuccessWith",
      "Routes",
      "/continue route",
      response.redirectRoute
    );
    req.session.save(err => {
      if (err) {
        logEmitter.emit("functionFail", "Routes", "/continue route", err);
        throw err;
      }
      if (response.redirectRoute === "/submit") {
        res.redirect("/submit");
      } else {
        res.redirect(`/new/${req.session.council}${response.redirectRoute}`);
      }
    });
  });

  return router;
};

module.exports = { continueRouter };
