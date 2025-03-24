/**
 * The edit router redirects the user to the next or previous page in the edit-mode 'sub-path', based on their cumulative edit-mode answers.
 * Routes: /edit/continue/:originator, /edit/back/:originator
 * @module routers/edit
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const editController = require("../controllers/edit.controller");
const { getCouncilDataByID } = require("../connectors/config-db/config-db.connector");

const editRouter = () => {
  const router = Router();

  router.post("/continue/:originator", async (req, res, next) => {
    logEmitter.emit(
      "functionCallWith",
      "Routes",
      "/edit/continue route",
      `Originator: ${req.params.originator}`
    );
    try {
      const controllerResponse = editController.editContinue(
        req.session.pathConfig,
        `/${req.query.edit}`,
        `/${req.params.originator}`,
        req.session.cumulativeFullAnswers,
        req.session.cumulativeEditAnswers,
        req.body,
        req.session.switches,
        req.session.allValidationErrors
      );

      req.session.cumulativeFullAnswers = controllerResponse.cumulativeFullAnswers;
      req.session.cumulativeEditAnswers = controllerResponse.cumulativeEditAnswers;
      req.session.validatorErrors = controllerResponse.validatorErrors;
      req.session.allValidationErrors = controllerResponse.newAllValidationErrors;
      req.session.switches = controllerResponse.switches;

      req.session.save(async (err) => {
        if (err) {
          logEmitter.emit("functionFail", "Routes", "/edit/continue route", err);
          throw err;
        }
        // If the originator is the "la-selector" thats mean LA not found by postcode lookup and need manual selection
        if (
          req.params.originator === "la-selector" &&
          Object.keys(controllerResponse.validatorErrors).length === 0
        ) {
          // Get the local authority data from the config DB
          req.session.localAuthority = await getCouncilDataByID(+req.body.local_authority);
          // If the local authority not onboarded and has a registration form URL, redirect to it instead of the normal path
          if (
            req.session.localAuthority &&
            req.session.localAuthority.reg_form_url &&
            req.session.localAuthority.reg_form_url !== ""
          ) {
            res.redirect(req.session.localAuthority.reg_form_url);
            return;
          }
          res.redirect("/new/la-established?edit=establishment-address-select");

          // In the case that we are in editing mode and we are on the "la-established" page, then we finish address change and redirect back to /registration-summary.
        } else if (req.params.originator === "la-established") {
          res.redirect(`/new/registration-summary`);
        } else if (controllerResponse.redirectRoute === "/registration-summary") {
          res.redirect(`/new/registration-summary`);
        } else {
          res.redirect(`/new${controllerResponse.redirectRoute}?edit=${req.query.edit}`);
        }
      });
    } catch (err) {
      logEmitter.emit(
        "functionFail",
        "Routes",
        "/edit/continue route",
        `Originator: ${req.params.originator}`,
        err
      );
      next(err);
    }
  });

  router.get("/back/:originator", (req, res) => {
    const controllerResponse = editController.editBack(
      req.session.pathConfig,
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
