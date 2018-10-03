const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const submitController = require("../controllers/submit.controller");

const submitRouter = () => {
  const router = Router();

  router.get("", async (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/submit route");
    const response = await submitController(
      req.session.council,
      req.session.cumulativeAnswers,
      req.session.addressLookups,
      req.session.pathConfig
    );

    req.session.submissionDate = response.submissionDate;
    req.session.fsaRegistrationNumber = response.fsaRegistrationNumber;
    req.session.email_fbo = response.email_fbo;
    req.session.lc_config = response.lc_config;

    logEmitter.emit(
      "functionSuccessWith",
      "Routes",
      "/submit route",
      response.redirectRoute
    );
    if (response.redirectRoute === "back") {
      res.redirect("back");
    }
    req.session.save(err => {
      if (err) {
        logEmitter.emit("functionFail", "Routes", "/submit route", err);
        throw err;
      }
      res.redirect(`/new/${req.session.council}${response.redirectRoute}`);
    });
  });

  return router;
};

module.exports = { submitRouter };
