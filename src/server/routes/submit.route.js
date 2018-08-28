const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const submitController = require("../controllers/submit.controller");

const submitRouter = () => {
  const router = Router();

  router.get("/submit", async (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/submit route");
    const response = await submitController(
      req.session.cumulativeAnswers,
      req.session.addressLookups
    );
    req.session.submissionDate = response.submissionDate;
    req.session.fsaRegistrationNumber = response.fsaRegistrationNumber;
    req.session.recipient = response.recipient;

    logEmitter.emit(
      "functionSuccessWith",
      "Routes",
      "/back route",
      response.redirectRoute
    );
    res.redirect(`/new/${req.session.council}${response.redirectRoute}`);
  });

  return router;
};

module.exports = { submitRouter };
