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

module.exports = () => {
  const router = Router();

  if (process.env.NODE_ENV === "production") {
    router.get("/", (req, res) => {
      res.redirect("https://www.gov.uk/food-business-registration");
    });
  }

  if (
    process.env.ENVIRONMENT_DESCRIPTION &&
    process.env.ENVIRONMENT_DESCRIPTION === "production"
  ) {
    router.all(
      "/prod-register-a-food-business.azurewebsites.net",
      (req, res) => {
        res.redirect(301, `https://register.food.gov.uk${req.path}`);
      }
    );
  }

  if (
    process.env.ENVIRONMENT_DESCRIPTION &&
    process.env.ENVIRONMENT_DESCRIPTION === ("onboarding" || "staging")
  ) {
    router.all(
      `/${process.env.ENVIRONMENT_DESCRIPTION}-register-a-food-business.azurewebsites.net`,
      (req, res) => {
        res.redirect(
          301,
          `https://${process.env.ENVIRONMENT_DESCRIPTION}-register.food.gov.uk${req.path}`
        );
      }
    );
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

  return router;
};
