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
 * @param {string} action An auxiliary variable, effectively telling controller what route this request came from
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const partnerDetailsController = async (
  currentPage,
  previousAnswers,
  newAnswers,
  council,
  action
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
    "partnerDetailsController"
  );

  const allowedActions = {
    save: "save",
    delete: "delete",
    continue: "continue"
  };

  try {
    controllerResponse.cumulativeFullAnswers = previousAnswers;

    const redirectPrefix =
      action === allowedActions.continue ? `/new/${council}` : "/partnership";

    if (action === allowedActions.continue) {
      newAnswers.partners = controllerResponse.cumulativeFullAnswers.partners;
    }

    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(currentPage, newAnswers).errors
    );

    const validationErrorsKeys = Object.keys(
      controllerResponse.validatorErrors
    );
    if (validationErrorsKeys.length > 0) {
      // ignore if it's only the partners array and action isn't continue
      if (
        validationErrorsKeys[0] === "partners" &&
        validationErrorsKeys.length === 1 &&
        action !== allowedActions.continue
      ) {
        controllerResponse.validatorErrors = {};
      } else {
        // if there are errors, redirect back to the current page
        controllerResponse.redirectRoute = `${redirectPrefix}${currentPage}`;
        if (newAnswers.index !== undefined) {
          controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
            `?id=${newAnswers.index}`
          );
        }
        logEmitter.emit(
          "functionSuccessWith",
          "partner-details.controller",
          "partnerDetailsController",
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

    switch (action) {
      case allowedActions.save:
        controllerResponse.redirectRoute = `/new/${council}/partner-name`;
        if (partners[partnerIndex]) {
          partners[partnerIndex] = partnerName;
        } else {
          if (partners.length < MAX_PARTNERS) {
            partners.push(partnerName);
          }
        }
        break;
      case allowedActions.delete:
        controllerResponse.redirectRoute = `/new/${council}/partner-name`;
        if (partners[partnerIndex]) {
          partners.splice(partnerIndex, 1);
        }
        break;
      case allowedActions.continue:
        controllerResponse.redirectRoute = `/new/${council}/main-partnership-contact`;
    }

    controllerResponse.cumulativeFullAnswers.partners = partners;
    controllerResponse.cumulativeFullAnswers.targetPartner = null;

    logEmitter.emit(
      "functionSuccess",
      "partner-details.controller",
      "partnerDetailsController"
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "partner-details.controller",
      "partnerDetailsController",
      err
    );
    throw err;
  }
};

module.exports = partnerDetailsController;
