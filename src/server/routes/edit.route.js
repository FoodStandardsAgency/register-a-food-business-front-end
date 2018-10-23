const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const editController = require("../controllers/edit.controller");

const editRouter = () => {
  const router = Router();

  router.post("/continue/:originator", (req, res) => {
    const controllerResponse = editController.editContinue(
      req.session.pathConfig.path,
      `/${req.query.edit}`,
      `/${req.params.originator}`,
      req.session.cumulativeFullAnswers,
      req.session.cumulativeEditAnswers,
      req.body,
      req.session.switches
    );

    req.session.cumulativeFullAnswers =
      controllerResponse.cumulativeFullAnswers;
    req.session.cumulativeEditAnswers =
      controllerResponse.cumulativeEditAnswers;
    req.session.validatorErrors = controllerResponse.validatorErrors;
    req.session.switches = controllerResponse.switches;

    req.session.save(err => {
      if (err) {
        logEmitter.emit("functionFail", "Routes", "/continue route", err);
        throw err;
      }
      if (controllerResponse.redirectRoute === "/registration-summary") {
        res.redirect(`/new/${req.session.council}/registration-summary`);
      } else {
        res.redirect(
          `/new/${req.session.council}${
            controllerResponse.redirectRoute
          }?edit=${req.query.edit}`
        );
      }
    });
  });

  router.post("/back/:originator", (req, res) => {
    const controllerResponse = editController.editBack(
      req.session.pathConfig.path,
      `/${req.query.edit}`,
      `/${req.params.originator}`,
      req.session.cumulativeFullAnswers,
      req.session.cumulativeEditAnswers
    );
  });

  router.get("/:target", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/edit/:target route");

    const target = req.params.target;

    logEmitter.emit("functionSuccess", "Routes", "/edit/:target route");
    res.redirect(`/new/${req.session.council}/${target}?edit=${target}`);
  });

  return router;
};

module.exports = { editRouter };
