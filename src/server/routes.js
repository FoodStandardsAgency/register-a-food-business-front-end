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
      "https://prod-register-a-food-business.azurewebsites.net/new/:council/:page",
      (req, res) => {
        res.redirect(
          `https://register.food.gov.uk/new/${req.params.council}/${req.params.page}`
        );
      }
    );
  }

  if (
    process.env.ENVIRONMENT_DESCRIPTION &&
    process.env.ENVIRONMENT_DESCRIPTION === ("onboarding" || "staging")
  ) {
    router.all(
      `https://${process.env.ENVIRONMENT_DESCRIPTION}-register-a-food-business.azurewebsites.net/new/:council/:page`,
      (req, res) => {
        res.redirect(
          `https://${process.env.ENVIRONMENT_DESCRIPTION}-register.food.gov.uk/new/${req.params.council}/${req.params.page}`
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
