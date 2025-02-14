const { Router } = require("express");

const {
  backRouter,
  cleansessionRouter,
  continueRouter,
  editRouter,
  findAddressRouter,
  findLocalAuthorityRouter,
  newRouter,
  qaRouter,
  submitRouter,
  switchesRouter,
  setCookieRouter,
  partnerDetailsRouter,
  tradingNameDetailsRouter,
  pdfsRouter
} = require("./routes/index");

module.exports = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.redirect("/new");
    return;
  });

  router.use("/back", backRouter());
  router.use("/cleansession", cleansessionRouter());
  router.use("/continue", continueRouter());
  router.use("/edit", editRouter());
  router.use("/findaddress", findAddressRouter());
  router.use("/findlocalauthority", findLocalAuthorityRouter());
  router.use("/new", newRouter());
  router.use("/qa", qaRouter());
  router.use("/submit", submitRouter());
  router.use("/switches", switchesRouter());
  router.use("/setcookie", setCookieRouter());
  router.use("/partnership", partnerDetailsRouter());
  router.use("/tradingname", tradingNameDetailsRouter());
  router.use("/pdfs", pdfsRouter());

  return router;
};
