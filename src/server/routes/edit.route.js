const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");

const editRouter = () => {
  const router = Router();

  router.get("/continue/:originator", (req, res) => {
  
  });

  router.get("/back/:originator", (req, res) => {
   
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
