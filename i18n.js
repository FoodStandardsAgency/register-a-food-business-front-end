const NextI18Next = require("next-i18next").default;
const path = require("path");

const detection = {
  // Prioritize query string to allow user language toggle
  order: ['querystring', 'cookie', 'header'],
  lookupQuerystring: 'lang'
};

module.exports = new NextI18Next({
  otherLanguages: ["cy"],
  localePath: path.resolve("./public/static/locales"),
  detection,
  keySeparator: false,
  shallowRender: true
});
