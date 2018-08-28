const { Router } = require("express");
const { logEmitter } = require("../services/logging.service");

const editRouter = () => {
  const router = Router();

  router.get("/:target", (req, res) => {
    logEmitter.emit("functionCall", "Routers", "/edit/:target route");

    const target = req.params.target;

    logEmitter.emit("functionSuccess", "Routers", "/edit/:target route");
    res.redirect(`/${target}?edit=on`);
  });

  return router;
};

module.exports = { editRouter };
