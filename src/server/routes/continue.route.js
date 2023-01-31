/**
 * The continue router redirects the user to the next page in the path, based on their cumulative answers
 * Routes: /continue/:originator
 * @module routers/continue
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const continueController = require("../controllers/continue.controller");
const {
  getCouncilDataByURL
} = require("../connectors/config-db/config-db.connector");

const continueRouter = () => {
  const router = Router();

  router.post("/:originator", async (req, res, next) => {
    logEmitter.emit(
      "functionCallWith",
      "Routes",
      "/continue route",
      `Originator: ${req.params.originator}`
    );
    try {
      const response = continueController(
        `/${req.params.originator}`,
        req.session.cumulativeFullAnswers,
        req.body,
        req.session.switches,
        req.session.pathConfig.path
      );

      req.session.cumulativeFullAnswers = response.cumulativeFullAnswers;
      req.session.validatorErrors = response.validatorErrors;
      req.session.allValidationErrors = response.allValidationErrors;
      req.session.switches = response.switches;
      req.session.submissionError = [];
      req.session.language = req.body.language;

      if (req.params.originator === "la-selector") {
        req.session.localAuthority = await getCouncilDataByURL(
          req.body.local_authority
        );
      }

      logEmitter.emit(
        "functionSuccessWith",
        "Routes",
        "/continue route",
        response.redirectRoute
      );
      req.session.save((err) => {
        if (err) {
          logEmitter.emit("functionFail", "Routes", "/continue route", err);
          throw err;
        }
        if (response.redirectRoute === "/submit") {
          res.redirect("/submit");
        } else {
          res.redirect(`/new${response.redirectRoute}`);
        }
      });
    } catch (err) {
      logEmitter.emit(
        "functionFail",
        "Routes",
        "/continue route",
        `Originator: ${req.params.originator}`,
        err
      );
      next(err);
    }
  });

  return router;
};

module.exports = { continueRouter };
