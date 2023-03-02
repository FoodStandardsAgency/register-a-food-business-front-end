/**
 * The edit router redirects the user to the next or previous page in the edit-mode 'sub-path', based on their cumulative edit-mode answers.
 * Routes: /edit/continue/:originator, /edit/back/:originator
 * @module routers/edit
 */

const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");
const editController = require("../controllers/edit.controller");
const {
  getCouncilDataByID
} = require("../connectors/config-db/config-db.connector");

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
      req.session.allValidationErrors =
        controllerResponse.newAllValidationErrors;
      req.session.switches = controllerResponse.switches;

      req.session.save(async (err) => {
        if (err) {
          logEmitter.emit(
            "functionFail",
            "Routes",
            "/edit/continue route",
            err
          );
          throw err;
        }
        if (req.params.originator === "la-selector") {
          if (
            req.body.local_authority_not_found === "yes" ||
            req.body.local_authority === ""
          ) {
            res.redirect("/new/la-not-onboarded");
          } else {
            req.session.localAuthority = await getCouncilDataByID(
              +req.body.local_authority
            );
            res.redirect(
              "/new/la-established?edit=establishment-address-select"
            );
          }
          // In the case that we are in editing mode and we are on the "la-established" page, then the next page will be "establishment-address-select".
        } else if (req.params.originator === "la-established") {
          if (req.session.changePostcode) {
            req.session.changePostcode = false;
            res.redirect("/new/establishment-address-select");
          }
        } else if (
          controllerResponse.redirectRoute === "/registration-summary"
        ) {
          res.redirect(`/new/registration-summary`);
        } else {
          res.redirect(
            `/new${controllerResponse.redirectRoute}?edit=${req.query.edit}`
          );
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
