const { getUkAddressesByPostcode } = require("../services/address.service");
const { validate } = require("../services/validation.service");
const { logEmitter } = require("../services/logging.service");
const { statusEmitter } = require("../services/statusEmitter.service");

const findAddressController = async (
  currentPage,
  previousAnswers,
  newAnswers
) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeAnswers: {},
    addressLookups: {},
    switches: {}
  };
  logEmitter.emit(
    "functionCall",
    "find-address.controller",
    "findAddressController"
  );

  try {
    controllerResponse.cumulativeAnswers = Object.assign(
      {},
      previousAnswers,
      newAnswers
    );

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
        `validatorErrors: ${
          controllerResponse.validatorErrors
        }. redirectRoute: ${controllerResponse.redirectRoute}`
      );
      return controllerResponse;
    }

    const searchPostcodeFieldName = Object.keys(newAnswers)[0];
    const searchPostcode = newAnswers[searchPostcodeFieldName];
    const addressesForPostcode = await getUkAddressesByPostcode(searchPostcode);

    controllerResponse.addressLookups[
      searchPostcodeFieldName
    ] = addressesForPostcode;

    if (addressesForPostcode.length > 0) {
      controllerResponse.switches[`${currentPage}-none-found`] = false;
      controllerResponse.redirectRoute = `${currentPage}-select`;
      statusEmitter.emit("incrementCount", "addressLookupsSucceeded");
    } else {
      controllerResponse.switches[`${currentPage}-none-found`] = true;
      controllerResponse.redirectRoute = `${currentPage}-manual`;
      statusEmitter.emit("incrementCount", "addressLookupsReturnedZero");
    }
    logEmitter.emit(
      "functionSuccessWith",
      "find-address.controller",
      "findAddressController",
      `${addressesForPostcode.length} addresses`
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "find-address.controller",
      "findAddressController",
      err
    );
    throw err;
  }
};

module.exports = findAddressController;
