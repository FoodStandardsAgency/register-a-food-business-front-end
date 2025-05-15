const { backRouter } = require("./back.route");
const { cleansessionRouter } = require("./cleansession.route");
const { continueRouter } = require("./continue.route");
const { editRouter } = require("./edit.route");
const { findAddressRouter } = require("./find-address.route");
const { findLocalAuthorityRouter } = require("./find-local-authority.route");
const { newRouter } = require("./new.route");
const { qaRouter } = require("./qa.route");
const { submitRouter } = require("./submit.route");
const { switchesRouter } = require("./switches.route");
const { setCookieRouter } = require("./set-cookie.route");
const { partnerDetailsRouter } = require("./partner-details.route");
const { tradingNameDetailsRouter } = require("./trading-name-details.route");
const { tradingStatusRouter } = require("./trading-status.route");
const { pdfsRouter } = require("./pdfs.route");

module.exports = {
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
  tradingStatusRouter,
  pdfsRouter
};
