const moment = require("moment");

let defaultFormat = "YYYY";
let defaultLocale = "en";

function getFilter(dateString, locale, format, ...args) {
  let [operation = null, arg1 = null, arg2 = null] = args;

  if (!format) format = defaultFormat;
  if (!locale) locale = defaultLocale;

  moment.locale(locale);

  if (operation) {
    if (operation == "add" && arg1 && arg2) {
      return moment(dateString).add(arg1, arg2).format(format);
    }
    if (operation == "subtract" && arg1 && arg2) {
      return moment(dateString).subtract(arg1, arg2).format(format);
    }
  }

  return moment(dateString).format(format);
}

module.exports = getFilter;

// Set user-specified default format for date
module.exports.setDefaultFormat = (format) => (defaultFormat = format);

// Set user-specified default locale
module.exports.setLocale = (locale) => (defaultLocale = locale);

// Add filter to nunjucks environment
module.exports.install = (env, customName) => {
  env.addFilter(customName || "date", getFilter);
};
