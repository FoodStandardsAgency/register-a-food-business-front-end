const { Router } = require("express");
const PropsGenerator = require("../propsGenerator");

const staticRouter = () => {
  const router = Router();

  router.get("/cookie-policy", (req, res) => {
    res.render("cookie-policy", {
      props: { ...PropsGenerator(req), hideback: true }
    });
  });

  router.get("/privacy-notice", (req, res) => {
    res.render("privacy-notice", {
      props: { ...PropsGenerator(req), hideback: true }
    });
  });

  router.get("/accessibility", (req, res) => {
    res.render("accessibility", {
      props: PropsGenerator(req)
    });
  });

  return router;
};

module.exports = { staticRouter };
