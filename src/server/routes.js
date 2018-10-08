const { Router } = require("express");
const { handle } = require("./next");

const {
  backRouter,
  cleansessionRouter,
  continueRouter,
  editRouter,
  findAddressRouter,
  newRouter,
  qaRouter,
  submitRouter,
  switchesRouter,
  setCookieRouter,
  statusRouter
} = require("./routes/index");

module.exports = () => {
  const router = Router();

  router.use("/back", backRouter());
  router.use("/cleansession", cleansessionRouter());
  router.use("/continue", continueRouter());
  router.use("/edit", editRouter());
  router.use("/findaddress", findAddressRouter());
  router.use("/new", newRouter());
  router.use("/qa", qaRouter());
  router.use("/submit", submitRouter());
  router.use("/switches", switchesRouter());
  router.use("/setcookie", setCookieRouter());
  router.use("/status", statusRouter());

  // Temporary solution for redirecting visitors who arrive at the root without a council specified
  router.get("/", (req, res) => {
    res.redirect("https://www.gov.uk/food-business-registration");
  });

  router.get("*", (req, res) => {
    handle(req, res);
  });

  return router;
};
