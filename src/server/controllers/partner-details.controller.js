/**
 * @module controllers/partner-details
 */

const { validate } = require("../services/validation.service");
const { logEmitter } = require("../services/logging.service");
const { statusEmitter } = require("../services/statusEmitter.service");

/**
 * Returns an object containing address lookup results, validator errors (if present), the redirect route (e.g. the next page),
 * the new value of the cumulative answers object, and the new value of the switches object.
 *
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {object} previousAnswers An object containing every past answer that has been given by the user
 * @param {object} newAnswers An object containing new answers from the current page
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

  const allowedActions = { save: "save", delete: "delete" };

  try {
    controllerResponse.cumulativeFullAnswers = previousAnswers;

    if (Object.values(allowedActions).includes(action)) {
      controllerResponse.validatorErrors = Object.assign(
        {},
        validate(currentPage, newAnswers).errors
      );

      if (Object.keys(controllerResponse.validatorErrors).length > 0) {
        // if there are errors, redirect back to the current page
        controllerResponse.redirectRoute = `/partnership${currentPage}`;
        if (controllerResponse.cumulativeFullAnswers.targetPartner) {
          controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
            `?id=${controllerResponse.cumulativeFullAnswers.targetPartner}`
          );
        }
        logEmitter.emit(
          "functionSuccessWith",
          "partner-details.controller",
          "partnerDetailsController",
          `validatorErrors: ${
            controllerResponse.validatorErrors
          }. redirectRoute: ${controllerResponse.redirectRoute}`
        );
        return controllerResponse;
      }

      const partners = controllerResponse.cumulativeFullAnswers.partners;

      if (action === allowedActions.save) {
        const partnerName = newAnswers["partner_name"];
        const partnerIndex = newAnswers["index"];
        if (partnerIndex) {
          // update partner
          if (partners[partnerIndex]) {
            partners[partnerIndex] = partnerName;
          } else {
            // TODO
          }
        } else {
          // add new partner
          if (partners.length < 5) {
            partners.push(partnerName);
          } else {
            // TODO
          }
        }
      } else if (action === allowedActions.delete) {
        const index = parseInt(newAnswers.index);
        if (!isNaN(index)) {
          if (partners[index]) {
            partners.splice(index, 1);
          }
        }
      }
      controllerResponse.cumulativeFullAnswers.partners = partners;
      controllerResponse.cumulativeFullAnswers.targetPartner = null;
      controllerResponse.redirectRoute = `/new/${council}/partner-name`;

      logEmitter.emit(
        "functionSuccess",
        "partner-details.controller",
        "partnerDetailsController"
      );
      return controllerResponse;
    } else {
      return controllerResponse;
    }
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
