const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const submitController = require("../controllers/submit.controller");

const submitRouter = () => {
  const router = Router();

  router.get("", async (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/submit route");
    const controllerResponse = await submitController(
      req.session.council,
      req.session.cumulativeAnswers,
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
