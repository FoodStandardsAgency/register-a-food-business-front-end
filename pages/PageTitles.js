const { operatorTypeEnum } = require("@slice-and-dice/register-a-food-business-validation");

const PageTitles = {
  prefix: "Register a Food Business",

  pageTitles: {
    "la-established": () => "You are registering with",
    "la-selector": () => "We couldn't find your Local Authority",
    "la-pdf-form": () => "Complete the application form",
    "business-other-details": () => "Other details",
    "business-type": () => "What kind of food business are you registering?",
    "business-scale": () => "Who do you intend to provide food to?",
    "food-type": () => "What type of food do you intend to handle?",
    "processing-activities": () =>
      "What food processing activities do you intend to carry out in your food business?",
    "business-water-supply": () => "What type of water supply does this establishment use?",
    "contact-representative": () => "Contact representative details",
    declaration: () => "Declaration",
    "establishment-address": () => "What is the establishment's postcode?",
    "establishment-address-manual": () => "What is the establishment's address?",
    "establishment-address-select": () => "Which is the establishment's address from the list?",
    "establishment-address-type": () => "Where is this establishment located?",
    "establishment-contact-details": () => "Establishment contact details",
    "establishment-opening-date-proactive": () => "Expected opening date",
    "establishment-opening-date-retroactive": () => "Opening date",
    "establishment-opening-status": () => "Is this establishment already trading?",
    "establishment-trading-name": () => "Trading name",
    "main-partnership-contact": () => "Who is the main point of contact?",
    "opening-days-irregular": () => "Opening periods",
    "opening-days-some": () => "Opening days",
    "opening-days-start": () =>
      "What days will this establishment be open and producing or serving food?",
    "opening-hours": () => "Opening hours",
    "operator-address": (role) =>
      role === operatorTypeEnum.PARTNERSHIP.key
        ? "What is the partnership contact's postcode?"
        : "What is the operator's postcode?",
    "operator-address-manual": (role) =>
      role === operatorTypeEnum.PARTNERSHIP.key
        ? "What is the partnership contact's address?"
        : "What is the operator's address?",
    "operator-address-select": (role) =>
      role === operatorTypeEnum.PARTNERSHIP.key
        ? "Which is the partnership contact's address from the list?"
        : "Which is the operator's address from the list?",
    "operator-charity-details": () => "Details of the operating charity, organisation or trust",
    "operator-company-details": () => "Company details",
    "operator-contact-details": (role) =>
      role === operatorTypeEnum.PARTNERSHIP.key
        ? "Partnership contact details"
        : "Operator contact details",
    "operator-name": () => "What is the operator's name?",
    "operator-type": () => "Who operates this business?",
    "partner-details": () => "Partner details",
    "partner-name": () => "What are the partners' names?",
    "partnership-contact-details": () => "Partnership details",
    "registration-role": () => "What is your role in this food business?",
    "registration-summary": () => "Check your answers",
    "summary-confirmation": () => "Submission complete"
  },

  defaultPageTitle: "Register a Food Business"
};

PageTitles.getUrlPageTitle = (url, validatorErrors, allValidationErrors, cumulativeFullAnswers) => {
  var isError =
    Object.keys(allValidationErrors).length > 0 || Object.keys(validatorErrors).length > 0;
  var urlParts = url.split("/");
  var page = (urlParts[2] ? urlParts[2] : urlParts[1]).split("?")[0]; // TODO : var page = (urlParts[2] ?? urlParts[1]).split("?")[0];
  var title =
    isError === true ? `Error ${PageTitles.defaultPageTitle}` : PageTitles.defaultPageTitle;

  if (page && page in PageTitles.pageTitles) {
    title =
      isError === true
        ? `Error ${PageTitles.prefix} - ${PageTitles.pageTitles[page](
            cumulativeFullAnswers.registration_role
          )}`
        : `${PageTitles.prefix} - ${PageTitles.pageTitles[page](
            cumulativeFullAnswers.registration_role
          )}`;
  }
  return title;
};

module.exports = { PageTitles };
