/**
 * The continue router redirects the user to the next page in the path, based on their cumulative answers
 * Routes: /continue/:originator
 * @module routers/continue
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const continueController = require("../controllers/continue.controller");
const {
  getCouncilDataByID
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
        if (
          req.body.local_authority_not_found === "yes" ||
          req.body.local_authority === ""
        ) {
          response.redirectRoute = "/la-not-onboarded";
        } else {
          if (isNaN(req.body.local_authority)) {
            const newError = new Error();
            newError.name = "continueControllerError";
            newError.message = "req.body.local_authority is not a number";
            logEmitter.emit(
              "functionFail",
              "Routes",
              "/continue route",
              newError
            );
            throw newError;
          }
          req.session.localAuthority = await getCouncilDataByID(
            +req.body.local_authority
          );
        }
      }

      req.session.save((err) => {
        if (err) {
          logEmitter.emit("functionFail", "Routes", "/continue route", err);
          throw err;
        }
        logEmitter.emit(
          "functionSuccessWith",
          "Routes",
          "/continue route",
          response.redirectRoute
        );
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
