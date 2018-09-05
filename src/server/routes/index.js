const { backRouter } = require("./back.route");
const { cleansessionRouter } = require("./cleansession.route");
const { continueRouter } = require("./continue.route");
const { editRouter } = require("./edit.route");
const { findAddressRouter } = require("./find-address.route");
const { newRouter } = require("./new.route");
const { qaRouter } = require("./qa.route");
const { submitRouter } = require("./submit.route");
const { switchesRouter } = require("./switches.route");
const { setCookieRouter } = require("./set-cookie.route");
const { healthcheckRouter } = require("./healthcheck.route");

module.exports = {
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
  healthcheckRouter
};
