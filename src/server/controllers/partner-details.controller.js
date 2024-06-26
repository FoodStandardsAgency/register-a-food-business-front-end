/**
 * @module controllers/partner-details
 */

const { validate } = require("../services/validation.service");
const { logEmitter } = require("../services/logging.service");
const { MAX_PARTNERS } = require("../config");

/**
 * Returns an object containing validator errors (if present), the redirect route (e.g. the next page),
 * the new value of the cumulative answers object, and the new value of the switches object.
 *
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {object} previousAnswers An object containing every past answer that has been given by the user
 * @param {boolean} edit Flag indicating if request was submitted in edit mode
 * @param {object} allValidationErrors An object containing validation errors collected from all active pages
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const partnerDetailsContinue = (currentPage, previousAnswers, edit, allValidationErrors) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    addressLookups: {},
    switches: {},
    allValidationErrors: allValidationErrors
  };
  logEmitter.emit("functionCall", "partner-details.controller", "partnerDetailsContinue");
  try {
    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(currentPage, Object.assign({}, { partners: previousAnswers.partners })).errors
    );

    const validationErrorsKeys = Object.keys(controllerResponse.validatorErrors);
    if (validationErrorsKeys.length > 0) {
      // if there are errors, redirect back to the current page
      controllerResponse.redirectRoute = `/new${currentPage}`;
      logEmitter.emit(
        "functionSuccessWith",
        "partner-details.controller",
        "partnerDetailsContinue",
        `validatorErrors: ${JSON.stringify(controllerResponse.validatorErrors)}. redirectRoute: ${
          controllerResponse.redirectRoute
        }`
      );
      return controllerResponse;
    }
    controllerResponse.redirectRoute = `/new/main-partnership-contact`;

    if (edit) {
      delete controllerResponse.allValidationErrors["partners"];
      if (
        previousAnswers.partners.find((partnerName) => {
          return partnerName === previousAnswers.main_partnership_contact;
        }) !== undefined
      ) {
        controllerResponse.redirectRoute = `/new/registration-summary`;
      } else {
        controllerResponse.redirectRoute = `/new/main-partnership-contact?edit=main-partnership-contact`;
      }
    }

    logEmitter.emit("functionSuccess", "partner-details.controller", "partnerDetailsContinue");
    return controllerResponse;
  } catch (err) {
    logEmitter.emit("functionFail", "partner-details.controller", "partnerDetailsContinue", err);
    throw err;
  }
};

/**
 * Returns an object containing validator errors (if present), the redirect route (e.g. the next page),
 * the new value of the cumulative answers object, and the new value of the switches object.
 *
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {object} previousAnswers An object containing every past answer that has been given by the user
 * @param {object} newAnswers An object containing new answers from the current page
 * @param {boolean} edit Flag indicating if request was submitted in edit mode
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const partnerDetailsSave = (currentPage, previousAnswers, newAnswers, edit) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    addressLookups: {},
    switches: {}
  };
  logEmitter.emit("functionCall", "partner-details.controller", "partnerDetailsSave");
  try {
    controllerResponse.cumulativeFullAnswers = previousAnswers;
    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(currentPage, { partner_name: newAnswers.partner_name }).errors
    );

    const validationErrorsKeys = Object.keys(controllerResponse.validatorErrors);
    if (validationErrorsKeys.length > 0) {
      // if there are errors, redirect back to the current page
      controllerResponse.redirectRoute = `/partnership${currentPage}`;
      if (newAnswers.index !== undefined) {
        controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
          `?id=${newAnswers.index}`
        );
      }
      if (edit) {
        const separator = controllerResponse.redirectRoute.indexOf("?") > 0 ? "&" : "?";
        controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
          `${separator}edit=partner-name`
        );
      }
      logEmitter.emit(
        "functionSuccessWith",
        "partner-details.controller",
        "partnerDetailsSave",
        `validatorErrors: ${JSON.stringify(controllerResponse.validatorErrors)}. redirectRoute: ${
          controllerResponse.redirectRoute
        }`
      );
      return controllerResponse;
    }

    const partners = controllerResponse.cumulativeFullAnswers.partners;

    const partnerName = newAnswers["partner_name"].trim();
    const partnerIndex = newAnswers["index"];
    controllerResponse.redirectRoute = `/new/partner-name`;

    if (partners[partnerIndex]) {
      partners[partnerIndex] = partnerName;
    } else {
      if (partners.length < MAX_PARTNERS) {
        partners.push(partnerName);
      }
    }

    if (edit) {
      controllerResponse.redirectRoute =
        controllerResponse.redirectRoute.concat("?edit=partner-name");
    }
    controllerResponse.cumulativeFullAnswers.partners = partners;
    delete controllerResponse.cumulativeFullAnswers.targetPartner;

    logEmitter.emit("functionSuccess", "partner-details.controller", "partnerDetailsSave");
    return controllerResponse;
  } catch (err) {
    logEmitter.emit("functionFail", "partner-details.controller", "partnerDetailsSave", err);
    throw err;
  }
};

/**
 * Returns an object containing validator errors (if present), the redirect route (e.g. the next page),
 * the new value of the cumulative answers object, and the new value of the switches object.
 *
 * @param {object} previousAnswers An object containing every past answer that has been given by the user
 * @param {object} newAnswers An object containing new answers from the current page
 * @param {boolean} edit Flag indicating if request was submitted in edit mode
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const partnerDetailsDelete = (previousAnswers, newAnswers, edit) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    addressLookups: {},
    switches: {}
  };
  logEmitter.emit("functionCall", "partner-details.controller", "partnerDetailsDelete");

  try {
    controllerResponse.cumulativeFullAnswers = previousAnswers;
    const partners = controllerResponse.cumulativeFullAnswers.partners;
    const partnerIndex = newAnswers["index"];

    controllerResponse.redirectRoute = `/new/partner-name`;
    if (partners[partnerIndex]) {
      partners.splice(partnerIndex, 1);
    }

    if (edit) {
      controllerResponse.redirectRoute =
        controllerResponse.redirectRoute.concat("?edit=partner-name");
    }
    controllerResponse.cumulativeFullAnswers.partners = partners;
    delete controllerResponse.cumulativeFullAnswers.targetPartner;

    logEmitter.emit("functionSuccess", "partner-details.controller", "partnerDetailsDelete");
    return controllerResponse;
  } catch (err) {
    logEmitter.emit("functionFail", "partner-details.controller", "partnerDetailsDelete", err);
    throw err;
  }
};

module.exports = {
  partnerDetailsContinue,
  partnerDetailsSave,
  partnerDetailsDelete
};
