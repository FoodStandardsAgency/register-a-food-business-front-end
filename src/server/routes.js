const { Router } = require("express");
const { QA_KEY } = require("./config");
const { handle } = require("./next");
const { logEmitter } = require("./services/logging.service");

const continueController = require("./controllers/continue.controller");
const submitController = require("./controllers/submit.controller");
const backController = require("./controllers/back.controller");
const switchesController = require("./controllers/switches.controller");
const findAddressController = require("./controllers/find-address.controller");

module.exports = () => {
  const router = Router();

  router.post("/continue/:originator/:editMode?", (req, res) => {
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

    logEmitter.emit("functionSuccess", "Routes", "/continue route");
    res.redirect(response.redirectRoute);
  });

  router.get("/back/:originator", (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/back route");
    const response = backController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers
    );
    logEmitter.emit("functionSuccessWith", "Routes", "/back route", response);
    res.redirect(response);
  });

  router.get("/submit", async (req, res) => {
    logEmitter.emit("functionCall", "Routes", "/submit route");
    const response = await submitController(
      // TODO JMB: stubbed LC url - unit tests need to be updated once complete.
      "west-dorset",
      req.session.cumulativeAnswers,
      req.session.addressLookups
    );
    req.session.submissionDate = response.submissionDate;
    req.session.fsaRegistrationNumber = response.fsaRegistrationNumber;
    req.session.email_fbo = response.email_fbo;
    req.session.lc_config = response.lc_config;

    logEmitter.emit(
      "functionSuccessWith",
      "Routes",
      "/back route",
      response.redirectRoute
    );
    res.redirect(response.redirectRoute);
  });

  router.get("/qa/:target", (req, res) => {
    logEmitter.emit("functionCall", "Routers", "/qa/:target route");
    if (req.query.QA_KEY && req.query.QA_KEY === QA_KEY) {
      const target = req.params.target;
      delete req.query.QA_KEY;
      req.session.cumulativeAnswers = req.query;
      logEmitter.emit(
        "functionSuccessWith",
        "Routes",
        "/qa/:target route",
        target
      );
      res.redirect(`/${target}`);
    } else {
      logEmitter.emit(
        "functionFail",
        "Routes",
        "/qa/:target route",
        "403 not permitted"
      );
      res.status(403);
      res.send("Not permitted");
    }
  });

  router.post("/switches/:switchName/:action/:originator", (req, res) => {
    logEmitter.emit(
      "functionCall",
      "Routers",
      "/switches/:switchName/:action route"
    );

    if (!req.session.switches) {
      req.session.switches = {};
    }

    const switchName = req.params.switchName;
    const action = req.params.action;

    const currentSwitchState = req.session.switches[switchName];

    const response = switchesController(
      currentSwitchState,
      action,
      req.session.cumulativeAnswers,
      req.body,
      `/${req.params.originator}`
    );

    req.session.switches[switchName] = response.newSwitchState;
    req.session.cumulativeAnswers = response.cumulativeAnswers;

    logEmitter.emit(
      "functionSuccess",
      "Routers",
      "/switches/:switchName/:action route"
    );
    res.redirect("back");
  });

  router.get("/edit/:target", (req, res) => {
    logEmitter.emit("functionCall", "Routers", "/edit/:target route");

    const target = req.params.target;

    logEmitter.emit("functionSuccess", "Routers", "/edit/:target route");
    res.redirect(`/${target}?edit=on`);
  });

  router.post("/findaddress/:originator", async (req, res) => {
    logEmitter.emit(
      "functionCall",
      "Routers",
      "/findaddress/:originator route"
    );

    const response = await findAddressController(
      `/${req.params.originator}`,
      req.session.cumulativeAnswers,
      req.body
    );

    req.session.cumulativeAnswers = response.cumulativeAnswers;
    req.session.validatorErrors = response.validatorErrors;

    req.session.addressLookups = Object.assign(
      {},
      req.session.addressLookups,
      response.addressLookups
    );

    req.session.switches = Object.assign(
      {},
      req.session.switches,
      response.switches
    );

    logEmitter.emit(
      "functionSuccess",
      "Routers",
      "/findaddress/:originator route"
    );
    res.redirect(response.redirectRoute);
  });

  router.get("/cleansession", (req, res) => {
    logEmitter.emit("functionCall", "Routers", "/cleansession route");
    req.session.destroy(err => {
      if (err) {
        logEmitter.emit("functionFail", "Routers", "/cleansession route", err);
        res.redirect("back");
      } else {
        logEmitter.emit(
          "functionSuccessWith",
          "Routers",
          "/cleansession route",
          "route '/'"
        );
        res.redirect("/");
      }
    });
  });

  router.get("*", (req, res) => {
    handle(req, res);
  });

  return router;
};
