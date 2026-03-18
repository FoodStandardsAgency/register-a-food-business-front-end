const { Router } = require("express");
const PropsGenerator = require("../propsGenerator");

const staticRouter = () => {
  const router = Router();

  router.get("/cookie-policy", (req, res) => {
    res.render("cookie-policy", {
      props: { ...PropsGenerator(req), backHref: "javascript:history.back()" }
    });
  });

  router.get("/privacy-notice", (req, res) => {
    res.render("privacy-notice", {
      props: { ...PropsGenerator(req), backHref: "javascript:history.back()" }
    });
  });

  router.get("/accessibility", (req, res) => {
    const props = PropsGenerator(req);
    console.log("currentPage:", props.currentPage);
    console.log("backHref:", props.backHref);
    res.render("accessibility", {
      props: { ...props, backHref: "javascript:history.back()" }
    });
  });

  return router;
};

module.exports = { staticRouter };
