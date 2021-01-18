const enTitles = require("../../public/static/locales/en/pageTitles.json");
const cyTitles = require("../../public/static/locales/cy/pageTitles.json");

const PageTitles = {
  prefix: "Register a Food Business",

  pageTitles: {
    "business-import-export":
      "Will this food business import or export any food from outside the UK?",
    "business-other-details": "Other details",
    "business-type": "What kind of food business are you registering?",
    "business-water-supply":
      "What type of water supply does this establishment use?",
    "contact-representative": "Contact details",
    "customer-type": "Who will this establishment supply food to?",
    declaration: "Declaration",
    "establishment-address": "Establishment postcode",
    "establishment-address-manual": "What is the establishment's address?",
    "establishment-address-select": "Establishment Address",
    "establishment-address-type": "Where is this establishment located?",
    "establishment-contact-details": "Establishment contact details",
    "establishment-opening-date-proactive": "Expected opening date",
    "establishment-opening-date-retroactive": "Opening date",
    "establishment-opening-status": "Is this establishment already trading?",
    "establishment-trading-name": "Trading name",
    "main-partnership-contact": "Who is the main point of contact?",
    "opening-days-irregular": "Opening periods",
    "opening-days-some": "Opening days",
    "opening-days-start":
      "What days will this establishment be open and producing or serving food?",
    "opening-hours": "Opening hours",
    "operator-address": "Postcode select",
    "operator-address-manual": "What is the operator's address?",
    "operator-address-select": "Address select",
    "operator-charity-details":
      "Details of the operating charity, organisation or trust",
    "operator-company-details": "Company details",
    "operator-contact-details": "Contact information",
    "operator-name": "What is the operator's name?",
    "operator-type": "Who operates this business?",
    "partner-details": "Partner details",
    "partner-name": "What are the partners' names?",
    "registration-role": "What is your role in this food business?",
    "registration-summary": "Check your answers",
    "summary-confirmation": "Submission complete"
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

  return translatedTitles[title] || title;
};

export default PageTitles;
