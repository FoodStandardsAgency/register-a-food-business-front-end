const moment = require("moment");

let defaultFormat = "YYYY";
let defaultLocale = "en";

function getFilter(dateString, locale, format, ...args) {
  let [operation = null, arg1 = null, arg2 = null] = args;

  let requiredFormat = format;
  let requiredLocale = locale;
  if (!requiredFormat) requiredFormat = defaultFormat;
  if (!requiredLocale) requiredLocale = defaultLocale;

  moment.locale(locale);

  if (operation) {
    if (operation === "add" && arg1 && arg2) {
      return moment(dateString).add(arg1, arg2).format(requiredFormat);
    }
    if (operation === "subtract" && arg1 && arg2) {
      return moment(dateString).subtract(arg1, arg2).format(requiredFormat);
    }
  }

  return moment(dateString).format(requiredFormat);
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
