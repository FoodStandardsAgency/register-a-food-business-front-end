/**
 * The submit router sends registration data and declaration to the back-end service and redirects to the final page if successful.
 * Routes: /submit
 * @module routers/submit
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const submitController = require("../controllers/submit.controller");

const submitRouter = () => {
  const router = Router();

  router.get("", async (req, res, next) => {
    logEmitter.emit("functionCall", "Routes", "/submit route");
    try {
      if (req.session.submissionSucceeded) {
        logEmitter.emit(
          "functionSuccessWith",
          "Routes",
          "/submit route",
          "/summary-confirmation"
        );
        res.redirect(`/new/summary-confirmation`);
      } else {
        if (!req.session.submissionPending) {
          req.session.submissionPending = true;
          req.session.save((err) => {
            if (err) {
              logEmitter.emit("functionFail", "Routes", "/submit route", err);
              throw err;
            }
          });

          const controllerResponse = await submitController(
            req.session.cumulativeFullAnswers,
            req.session.addressLookups,
            req.session.pathConfig._id,
            req.session.id,
            req.session.language,
            req.session.pathConfig.path
          );

          req.session.submissionDate = controllerResponse.submissionDate;
          req.session.fsaRegistrationNumber =
            controllerResponse.fsaRegistrationNumber;
          req.session.emailFbo = controllerResponse.emailFbo;
          req.session.laConfig = controllerResponse.laConfig;
          req.session.submissionSucceeded =
            controllerResponse.submissionSucceeded;
          req.session.submissionPending = false;

          logEmitter.emit(
            "functionSuccessWith",
            "Routes",
            "/submit route",
            controllerResponse.redirectRoute
          );
          if (controllerResponse.redirectRoute === "/registration-summary") {
            req.session.submissionError = controllerResponse.submissionError;
            req.session.allValidationErrors =
              controllerResponse.allValidationErrors;
            req.session.save((err) => {
              if (err) {
                logEmitter.emit("functionFail", "Routes", "/submit route", err);
                throw err;
              }
              res.redirect(`/new${controllerResponse.redirectRoute}`);
            });
          } else {
            req.session.submissionError = controllerResponse.submissionError;
            req.session.save((err) => {
              if (err) {
                logEmitter.emit("functionFail", "Routes", "/submit route", err);
                throw err;
              }
              res.redirect(`/new${controllerResponse.redirectRoute}`);
            });
          }
        }
      }
    } catch (err) {
      logEmitter.emit("functionFail", "Routes", "/submit route", err);
      next(err);
    }
  });

  return router;
};

module.exports = { submitRouter };
