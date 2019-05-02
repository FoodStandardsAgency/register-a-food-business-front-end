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
 * @param {object} newAnswers An object containing new answers from the current page
 * @param {string} council local_council_url allowing to put the user back on the path by redirecting to /new/council
 * @param {boolean} edit Flag indicating if request was submitted in edit mode
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const partnerDetailsContinue = (
  currentPage,
  previousAnswers,
  newAnswers,
  council,
  edit
) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    addressLookups: {},
    switches: {}
  };
  logEmitter.emit(
    "functionCall",
    "partner-details.controller",
    "partnerDetailsContinue"
  );
  try {
    controllerResponse.cumulativeFullAnswers = previousAnswers;
    newAnswers.partners = controllerResponse.cumulativeFullAnswers.partners;

    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(currentPage, newAnswers).errors
    );

    const validationErrorsKeys = Object.keys(
      controllerResponse.validatorErrors
    );
    if (validationErrorsKeys.length > 0) {
      // if there are errors, redirect back to the current page
      controllerResponse.redirectRoute = `/new/${council}${currentPage}`;
      logEmitter.emit(
        "functionSuccessWith",
        "partner-details.controller",
        "partnerDetailsContinue",
        `validatorErrors: ${JSON.stringify(
          controllerResponse.validatorErrors
        )}. redirectRoute: ${controllerResponse.redirectRoute}`
      );
      return controllerResponse;
    }
    controllerResponse.redirectRoute = `/new/${council}/main-partnership-contact`;

    if (edit) {
      if (
        controllerResponse.cumulativeFullAnswers.partners.find(partnerName => {
          return (
            partnerName ===
            controllerResponse.cumulativeFullAnswers.main_partnership_contact
          );
        }) !== undefined
      ) {
        controllerResponse.redirectRoute = `/new/${council}/registration-summary`;
      } else {
        controllerResponse.redirectRoute = `/new/${council}/main-partnership-contact?edit=main-partnership-contact`;
      }
    }

    logEmitter.emit(
      "functionSuccess",
      "partner-details.controller",
      "partnerDetailsContinue"
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "partner-details.controller",
      "partnerDetailsContinue",
      err
    );
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
 * @param {string} council local_council_url allowing to put the user back on the path by redirecting to /new/council
 * @param {boolean} edit Flag indicating if request was submitted in edit mode
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const partnerDetailsSave = (
  currentPage,
  previousAnswers,
  newAnswers,
  council,
  edit
) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    addressLookups: {},
    switches: {}
  };
  logEmitter.emit(
    "functionCall",
    "partner-details.controller",
    "partnerDetailsSave"
  );
  try {
    controllerResponse.cumulativeFullAnswers = previousAnswers;
    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(currentPage, newAnswers).errors
    );

    const validationErrorsKeys = Object.keys(
      controllerResponse.validatorErrors
    );
    if (validationErrorsKeys.length > 0) {
      // ignore if it's only the partners array
      if (
        validationErrorsKeys[0] === "partners" &&
        validationErrorsKeys.length === 1
      ) {
        controllerResponse.validatorErrors = {};
      } else {
        // if there are errors, redirect back to the current page
        controllerResponse.redirectRoute = `/partnership${currentPage}`;
        if (newAnswers.index !== undefined) {
          controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
            `?id=${newAnswers.index}`
          );
        }
        if (edit) {
          const separator =
            controllerResponse.redirectRoute.indexOf("?") > 0 ? "&" : "?";
          controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
            `${separator}edit=partner-name`
          );
        }
        logEmitter.emit(
          "functionSuccessWith",
          "partner-details.controller",
          "partnerDetailsSave",
          `validatorErrors: ${JSON.stringify(
            controllerResponse.validatorErrors
          )}. redirectRoute: ${controllerResponse.redirectRoute}`
        );
        return controllerResponse;
      }
    }

    const partners = controllerResponse.cumulativeFullAnswers.partners;
    const partnerName = newAnswers["partner_name"];
    const partnerIndex = newAnswers["index"];
    controllerResponse.redirectRoute = `/new/${council}/partner-name`;

    if (partners[partnerIndex]) {
      partners[partnerIndex] = partnerName;
    } else {
      if (partners.length < MAX_PARTNERS) {
        partners.push(partnerName);
      }
    }

    if (edit) {
      controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
        "?edit=partner-name"
      );
    }
    controllerResponse.cumulativeFullAnswers.partners = partners;
    controllerResponse.cumulativeFullAnswers.targetPartner = null;

    logEmitter.emit(
      "functionSuccess",
      "partner-details.controller",
      "partnerDetailsSave"
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "partner-details.controller",
      "partnerDetailsSave",
      err
    );
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
 * @param {string} council local_council_url allowing to put the user back on the path by redirecting to /new/council
 * @param {boolean} edit Flag indicating if request was submitted in edit mode
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const partnerDetailsDelete = (
  currentPage,
  previousAnswers,
  newAnswers,
  council,
  edit
) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    addressLookups: {},
    switches: {}
  };
  logEmitter.emit(
    "functionCall",
    "partner-details.controller",
    "partnerDetailsDelete"
  );

  try {
    controllerResponse.cumulativeFullAnswers = previousAnswers;
    const partners = controllerResponse.cumulativeFullAnswers.partners;
    const partnerIndex = newAnswers["index"];

    controllerResponse.redirectRoute = `/new/${council}${currentPage}`;
    if (partners[partnerIndex]) {
      partners.splice(partnerIndex, 1);
    }

    if (edit) {
      controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
        "?edit=partner-name"
      );
    }
    controllerResponse.cumulativeFullAnswers.partners = partners;
    controllerResponse.cumulativeFullAnswers.targetPartner = null;

    logEmitter.emit(
      "functionSuccess",
      "partner-details.controller",
      "partnerDetailsDelete"
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "partner-details.controller",
      "partnerDetailsDelete",
      err
    );
    throw err;
  }
};

module.exports = {
  partnerDetailsContinue,
  partnerDetailsSave,
  partnerDetailsDelete
};
