import validator from "validator";

const enTitles = require("../../public/static/locales/en/pageTitles.json");
const cyTitles = require("../../public/static/locales/cy/pageTitles.json");
const enErrorTitles = require("../../public/static/locales/en/errorPageTitles.json");
const cyErrorTitles = require("../../public/static/locales/cy/errorPageTitles.json");

const PageTitles = {
  prefix: "Register a Food Business",

  pageTitles: {
    "business-import-export": "Import/Export",
    "business-other-details": "Other Details",
    "business-type": "Business Type",
    "business-water-supply": "Water Supply",
    "contact-representative": "Contact Details",
    "customer-type": "Type of Customer",
    declaration: "Declaration",
    "establishment-address": "Establishment Address",
    "establishment-address-manual": "Establishment Address",
    "establishment-address-select": "Establishment Address",
    "establishment-address-type": "Establishment Address Type",
    "establishment-contact-details": "Establishment Contact Details",
    "establishment-opening-date-proactive": "Opening Date",
    "establishment-opening-date-retroactive": "Opening Date",
    "establishment-opening-status": "Opening Status",
    "establishment-trading-name": "Trading Name",
    "main-partnership-contact": "Point of Contact",
    "opening-days-irregular": "Opening Days",
    "opening-days-some": "Opening Days",
    "opening-days-start": "Opening Days",
    "opening-hours": "Opening Hours",
    "operator-address": "Operator Address",
    "operator-address-manual": "Operator Address",
    "operator-address-select": "Operator Address",
    "operator-charity-details": "Details",
    "operator-company-details": "Company Details",
    "operator-contact-details": "Operator Contact Details",
    "operator-name": "Operator Name",
    "operator-type": "Operator Type",
    "partner-details": "Partner Details",
    "partner-name": "Partners",
    "registration-role": "Your Role",
    "registration-summary": "Registration Summary",
    "summary-confirmation": "Confirmation"
  },

  defaultPageTitle: "Register a Food Business"
};

PageTitles.getUrlPageTitle = (
  url,
  language,
  validatorErrors,
  allValidationErrors
) => {
  var allValidationErrorLength =
    typeof allValidationErrors === "object"
      ? Object.keys(allValidationErrors).length
      : 0;
  var validatorErrorLength =
    typeof validatorErrors === "object"
      ? Object.keys(validatorErrors).length
      : 0;

  var errorLength =
    allValidationErrorLength > validatorErrorLength
      ? allValidationErrorLength
      : validatorErrorLength;
  var urlParts = url.split("/");
  var page = (urlParts[2] ?? urlParts[1]).split("?")[0];
  var title = PageTitles.defaultPageTitle;
  var translatedTitles =
    language === "cy"
      ? errorLength > 0
        ? cyErrorTitles
        : cyTitles
      : errorLength
      ? enErrorTitles
      : enTitles;

  if (page && page in PageTitles.pageTitles) {
    title =
      errorLength > 0
        ? `Error: ${PageTitles.prefix} - ${PageTitles.pageTitles[page]}`
        : `${PageTitles.prefix} - ${PageTitles.pageTitles[page]}`;
  }
  return translatedTitles[title] || title;
};

export default PageTitles;
