/**
 * @module controllers/find-local-authority
 */

const {
  getLocalAuthorityByPostcode,
  getLocalAuthorityByPoint
} = require("../services/local-authority.service");
const { validate } = require("../services/validation.service");
const { logEmitter } = require("../services/logging.service");

/**
 * Returns an object containing local authority search by postcode results, validator errors (if present), the redirect route (e.g. the next page),
 * the new value of the cumulative answers object, and the new value of the switches object.
 *
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {object} previousAnswers An object containing every past answer that has been given by the user
 * @param {object} newAnswers An object containing new answers from the current page
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const findLocalAuthorityController = async (
  currentPage,
  previousAnswers,
  newAnswers,
  establishmentPostcodeFind
) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    localAuthority: null
  };
  logEmitter.emit(
    "functionCall",
    "find-local-authority.controller",
    "findLocalAuthorityController"
  );
  let localAuthority;
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
        "find-local-authority.controller",
        "findLocalAuthorityController",
        `validatorErrors: ${controllerResponse.validatorErrors}. redirectRoute: ${controllerResponse.redirectRoute}`
      );
      return controllerResponse;
    }

    if (newAnswers.establishment_address_selected) {
      const address = establishmentPostcodeFind[+newAnswers.establishment_address_selected];

      if (address.longitude && address.latitude) {
        localAuthority = await getLocalAuthorityByPoint(address.longitude, address.latitude);
      }
    }

    const searchPostcode = previousAnswers.establishment_postcode_find;
    if (!localAuthority) {
      localAuthority = await getLocalAuthorityByPostcode(searchPostcode);
    }

    controllerResponse.localAuthority = localAuthority;

    delete controllerResponse.cumulativeFullAnswers.local_authority;

    if (!localAuthority) {
      controllerResponse.redirectRoute = "/la-selector";
    } else {
      controllerResponse.redirectRoute = "/la-established";
    }
    logEmitter.emit(
      "functionSuccessWith",
      "find-local-authority.controller",
      "findLocalAuthorityController",
      `${searchPostcode} postcode belongs to ${localAuthority.local_authority_name}`
    );
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "find-local-authority.controller",
      "findLocalAuthorityController",
      err
    );
    controllerResponse.redirectRoute = "/la-selector";
  }
  return controllerResponse;
};

module.exports = findLocalAuthorityController;
