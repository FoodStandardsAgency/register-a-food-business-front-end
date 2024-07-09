/**
 * @module controllers/find-address
 */

const { getUkAddressesByPostcode } = require("../services/address.service");
const { validate } = require("../services/validation.service");
const { logEmitter } = require("../services/logging.service");

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
const findAddressController = async (currentPage, previousAnswers, newAnswers) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    addressLookups: {},
    switches: {}
  };
  logEmitter.emit("functionCall", "find-address.controller", "findAddressController");
  let searchPostcodeFieldName = "";
  try {
    controllerResponse.cumulativeFullAnswers = Object.assign({}, previousAnswers, newAnswers);

    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(currentPage, newAnswers).errors
    );

    if (Object.keys(controllerResponse.validatorErrors).length > 0) {
      // if there are errors, redirect back to the current page
      controllerResponse.redirectRoute = currentPage;
      logEmitter.emit(
        "functionSuccessWith",
        "find-address.controller",
        "findAddressController",
        `validatorErrors: ${controllerResponse.validatorErrors}. redirectRoute: ${controllerResponse.redirectRoute}`
      );
      return controllerResponse;
    }

    searchPostcodeFieldName = Object.keys(newAnswers)[0];
    const searchPostcode = newAnswers[searchPostcodeFieldName];
    const addressesForPostcode = await getUkAddressesByPostcode(searchPostcode);

    controllerResponse.addressLookups[searchPostcodeFieldName] = addressesForPostcode;

    let addressType = currentPage;
    if (currentPage == "/establishment-address-type") {
      // find-address for establishments is triggered by the establishment-address-type page
      addressType = "/establishment-address";
    }

    //the below used to take the current page and add the suffix '-select- or '-manual', this is because the establishment address type page was incorrectly appearing as establishment-address and thus skipping the page validation, the below removes the -type and keeps the path as expected
    if (addressesForPostcode.length > 0) {
      controllerResponse.switches[`${addressType}-none-found`] = false;
      controllerResponse.redirectRoute = `${addressType}-select`;
    } else {
      controllerResponse.switches[`${addressType}-none-found`] = true;
      controllerResponse.redirectRoute = `${addressType}-manual`;
    }
    logEmitter.emit(
      "functionSuccessWith",
      "find-address.controller",
      "findAddressController",
      `${addressesForPostcode.length} addresses`
    );
  } catch (err) {
    logEmitter.emit("functionFail", "find-address.controller", "findAddressController", err);
    controllerResponse.addressLookups[searchPostcodeFieldName] = [];
    controllerResponse.switches[`${currentPage}-none-found`] = true;
    controllerResponse.redirectRoute = `${currentPage}-manual`;
  }
  return controllerResponse;
};

module.exports = findAddressController;
