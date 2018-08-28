const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const continueController = require("../controllers/continue.controller");

const continueRouter = () => {
  const router = Router();

  router.post("/:originator/:editMode?", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/continue route");
    const editMode = req.params.editMode === "true" ? true : false;

    const response = continueController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers,
      req.body,
      req.session.switches,
      editMode
    );

    req.session.cumulativeAnswers = response.cumulativeAnswers;
    req.session.validatorErrors = response.validatorErrors;
    req.session.switches = response.switches;

    logEmitter.emit(
      "functionSuccessWith",
      "Routes",
      "/continue route",
      response.redirectRoute
    );
    if (response.redirectRoute === "/submit") {
      res.redirect("/submit");
    } else {
      res.redirect(`/new/${req.session.council}${response.redirectRoute}`);
    }
  });

  return router;
};

module.exports = { continueRouter };
