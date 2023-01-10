/**
 * The edit router redirects the user to the next or previous page in the edit-mode 'sub-path', based on their cumulative edit-mode answers.
 * Routes: /edit/continue/:originator, /edit/back/:originator
 * @module routers/edit
 */

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
      req.session.switches,
      req.session.allValidationErrors
    );

    req.session.cumulativeFullAnswers =
      controllerResponse.cumulativeFullAnswers;
    req.session.cumulativeEditAnswers =
      controllerResponse.cumulativeEditAnswers;
    req.session.validatorErrors = controllerResponse.validatorErrors;
    req.session.allValidationErrors = controllerResponse.newAllValidationErrors;
    req.session.switches = controllerResponse.switches;

    req.session.save((err) => {
      if (err) {
        logEmitter.emit("functionFail", "Routes", "/continue route", err);
        throw err;
      }
      if (controllerResponse.redirectRoute === "/registration-summary") {
        res.redirect(`/new/registration-summary`);
      } else {
        res.redirect(
          `/new${controllerResponse.redirectRoute}?edit=${req.query.edit}`
        );
      }
    });
  });

  router.get("/back/:originator", (req, res) => {
    const controllerResponse = editController.editBack(
      req.session.pathConfig.path,
      `/${req.query.edit}`,
      `/${req.params.originator}`,
      req.session.cumulativeFullAnswers,
      req.session.cumulativeEditAnswers
    );

    res.redirect(`/new${controllerResponse}?edit=${req.query.edit}`);
  });

  router.get("/:target", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/edit/:target route");

    const target = req.params.target;

    logEmitter.emit("functionSuccess", "Routes", "/edit/:target route");
    res.redirect(`/new/${target}?edit=${target}`);
  });

  return router;
};

module.exports = { editRouter };
