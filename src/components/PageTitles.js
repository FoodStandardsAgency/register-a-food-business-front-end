const enTitles = require("../../public/static/locales/en/pageTitles.json");
const cyTitles = require("../../public/static/locales/cy/pageTitles.json");

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

PageTitles.getUrlPageTitle = (url, language) => {
  var urlParts = url.split("/");
  var page = (urlParts[2] ?? urlParts[1]).split("?")[0];
  var title = PageTitles.defaultPageTitle;
  var translatedTitles = language === "cy" ? cyTitles : enTitles;

  if (page && page in PageTitles.pageTitles) {
    title = `${PageTitles.prefix} - ${PageTitles.pageTitles[page]}`;
  }

  // Translate server side to prevent title flicking as client side renders.
  // Note: EN translations have welsh keys to allow client side translation
  //       back to english after server renders welsh
  return translatedTitles[title] || title;
};

export default PageTitles;
