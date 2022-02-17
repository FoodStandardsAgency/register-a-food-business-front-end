const { Router } = require("express");

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
  statusRouter,
  partnerDetailsRouter,
  pdfsRouter
} = require("./routes/index");
const { logEmitter } = require("./services/logging.service");
const PropsGenerator = require("./propsGenerator");

module.exports = () => {
  const router = Router();

  if (process.env.NODE_ENV === "production") {
    router.get("/", (req, res) => {
      res.redirect("https://www.gov.uk/food-business-registration");
    });
  }

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
  router.use("/partnership", partnerDetailsRouter());
  router.use("/pdfs", pdfsRouter());

  // Error Handling
  router.use((err, req, res, next) => {
    logEmitter.emit(
      "error",
      "Routing error occured: " + err
    );
    res.render(`_error`, { props: PropsGenerator(req) })
  })

  return router;
};
