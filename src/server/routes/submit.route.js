/**
 * The submit router sends registration data and metadata to the back-end service and redirects to the final page if successful.
 * Routes: /submit
 * @module routers/submit
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const submitController = require("../controllers/submit.controller");

const submitRouter = () => {
  const router = Router();

  router.post("", async (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/submit route");
    const controllerResponse = await submitController(
      req.session.council,
      req.session.cumulativeFullAnswers,
      req.session.addressLookups,
      req.session.pathConfig._id
    );

    req.session.submissionDate = controllerResponse.submissionDate;
    req.session.fsaRegistrationNumber =
      controllerResponse.fsaRegistrationNumber;
    req.session.emailFbo = controllerResponse.emailFbo;
    req.session.lcConfig = controllerResponse.lcConfig;

    logEmitter.emit(
      "functionSuccessWith",
      "Routes",
      "/submit route",
      controllerResponse.redirectRoute
    );
    if (controllerResponse.redirectRoute === "back") {
      res.redirect("back");
    }
    req.session.save(err => {
      if (err) {
        logEmitter.emit("functionFail", "Routes", "/submit route", err);
        throw err;
      }
      res.redirect(
        `/new/${req.session.council}${controllerResponse.redirectRoute}`
      );
    });
  });

  return router;
};

module.exports = { submitRouter };
