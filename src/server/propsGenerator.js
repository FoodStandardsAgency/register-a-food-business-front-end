const { PageTitles } = require("../../pages/PageTitles");
const i18n = require("i18n");
const {
  businessTypeEnum,
  foodTypeEnum,
  processingActivitiesEnum,
  businessScaleEnum,
  waterSupplyEnum,
  operatorTypeEnum,
  establishmentTypeEnum
} = require("@slice-and-dice/register-a-food-business-validation");

module.exports = (req) => {
  /************************************************************************************
    Declaration of variables that require more extensive configuration or logic
    ************************************************************************************/
  const editModeFirstPage = req && req.query && req.query.edit ? `/${req.query.edit}` : undefined;

  const businessTypes = Object.keys(businessTypeEnum).map((bt) => businessTypeEnum[bt].value.en);

  const enums = {
    foodType: foodTypeEnum,
    processingActivities: processingActivitiesEnum,
    businessScale: businessScaleEnum,
    waterSupply: waterSupplyEnum,
    operatorType: operatorTypeEnum,
    establishmentType: establishmentTypeEnum,
    businessType: businessTypeEnum
  };

  const editModePartnerDetails =
    req &&
    req.query &&
    req.query.edit &&
    (req.query.edit === "partner-name" || "registration-role");

  const acceptAllCookies =
    req && req.cookies && req.cookies.acceptAllCookies ? req.cookies.acceptAllCookies : undefined;

  const csrfToken = req && req.csrfToken && req.csrfToken();

  const cumulativeFullAnswers =
    req && req.session && req.session.cumulativeFullAnswers
      ? req.session.cumulativeFullAnswers
      : {};

  const language = i18n.getLocale(req);
  // req && req.body && req.body.language ? req.body.language : "en"; //  Is this even required anymore?

  const currentPageWithQuery = `/${req.url.split("/")[1]}`;

  const fullCurrentPage = req.url;

  const formAction = editModeFirstPage
    ? `/edit/continue${currentPageWithQuery}`
    : `/continue${currentPageWithQuery}`;

  const currentPage = currentPageWithQuery.split("?")[0];

  const partnerDetailsUrl = editModePartnerDetails
    ? "/partnership/partner-details?edit=partner-name"
    : "/partnership/partner-details";

  const partnerDetailsDeleteFormAction = editModePartnerDetails
    ? "/partnership/delete-partner?edit=partner-name"
    : "/partnership/delete-partner";

  const partnerDetailsContinueFormAction = editModePartnerDetails
    ? "/partnership/continue?edit=partner-name"
    : "/partnership/continue";

  const partnerDetailsSaveFormAction = editModePartnerDetails
    ? "/partnership/save?edit=partner-name"
    : "/partnership/save";

  const partnerDetailsBackUrl = editModePartnerDetails
    ? "/partnership/back?edit=partner-name"
    : "/partnership/back";

  const validatorErrorsCleaned =
    req && req.session && req.session.validatorErrors ? { ...req.session.validatorErrors } : {};

  delete validatorErrorsCleaned["undefined"];

  const allValidationErrorsCleaned =
    req && req.session && req.session.allValidationErrors
      ? { ...req.session.allValidationErrors }
      : {};
  delete allValidationErrorsCleaned["undefined"];

  const currentPageTitle = PageTitles.getUrlPageTitle(
    req.url,
    validatorErrorsCleaned,
    allValidationErrorsCleaned,
    cumulativeFullAnswers
  );

  /************************************************************************************
    Declaration of initialProps object, containing the above variables, plus others.
    This object will ultimately be passed to the Page component.
    Therefore, any data in the initialProps object is available within a page wrapped
    with this SessionWrapper.
    E.g. inside the 'business-type.js' page, you can access 'props.cumulativeFullAnswers'.
    ************************************************************************************/
  const initialProps = {
    laLookupNote: process.env.LA_LOOKUP_NOTE,
    laSelectorNote: process.env.LA_SELECTOR_NOTE,
    acceptAllCookies,
    businessTypes,
    enums,
    editModeFirstPage,
    formAction,
    csrfToken,
    language,
    partnerDetailsUrl,
    partnerDetailsDeleteFormAction,
    partnerDetailsContinueFormAction,
    partnerDetailsSaveFormAction,
    partnerDetailsBackUrl,
    fullCurrentPage,
    currentPage,
    currentPageTitle,
    cumulativeFullAnswers,
    transformedData:
      req && req.session && req.session.transformedData ? req.session.transformedData : {},
    validatorErrors: validatorErrorsCleaned,
    allValidationErrors: allValidationErrorsCleaned,
    switches: req && req.session && req.session.switches ? req.session.switches : {},
    fsaRegistrationNumber:
      req && req.session && req.session.fsaRegistrationNumber
        ? req.session.fsaRegistrationNumber
        : "",
    submissionDate:
      req && req.session && req.session.submissionDate ? req.session.submissionDate : "",
    submissionError:
      req && req.session && req.session.submissionError ? req.session.submissionError : [],
    emailFbo: req && req.session && req.session.emailFbo ? req.session.emailFbo : {},
    laConfig: req && req.session && req.session.laConfig ? req.session.laConfig : {},
    localAuthority:
      req && req.session && req.session.localAuthority ? req.session.localAuthority : {},
    addressLookups:
      req && req.session && req.session.addressLookups ? req.session.addressLookups : {},
    council: req && req.session && req.session.council ? req.session.council : "",
    isBrowserSupported:
      req && req.session && req.session.isBrowserSupported ? req.session.isBrowserSupported : false,
    browser: req && req.session && req.session.browser ? req.session.browser : "",
    browserVersion:
      req && req.session && req.session.browserVersion ? req.session.browserVersion : ""
  };

  // The getInitialProps function (a method of the 'wrapper' function) returns the initialProps object
  return initialProps;
};
