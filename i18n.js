const NextI18Next = require("next-i18next").default;
const path = require("path");

module.exports = new NextI18Next({
  otherLanguages: ["cy"],
  localePath: path.resolve("./public/static/locales"),
  keySeparator: false,
  shallowRender: true
});
