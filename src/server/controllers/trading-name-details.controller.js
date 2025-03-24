/**
 * @module controllers/trading-name-details
 */

const { validate } = require("../services/validation.service");
const { logEmitter } = require("../services/logging.service");
const { MAX_TRADING_NAMES } = require("../config");

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
const tradingNameDetailsContinue = (
  currentPage,
  newAnswers,
  previousAnswers,
  edit,
  allValidationErrors
) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    addressLookups: {},
    switches: {},
    allValidationErrors: allValidationErrors
  };
  logEmitter.emit("functionCall", "trading-name-details.controller", "tradingNameDetailsContinue");
  try {
    controllerResponse.cumulativeFullAnswers = previousAnswers;

    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(
        currentPage,
        Object.assign(
          {},
          {
            establishment_additional_trading_names:
              previousAnswers.establishment_additional_trading_names,
            establishment_trading_name: newAnswers.establishment_trading_name
          }
        )
      ).errors
    );

    const validationErrorsKeys = Object.keys(controllerResponse.validatorErrors);
    if (validationErrorsKeys.length > 0) {
      // if there are errors, redirect back to the current page
      controllerResponse.redirectRoute = `/new${currentPage}`;
      logEmitter.emit(
        "functionSuccessWith",
        "trading-name-details.controller",
        "tradingNameDetailsContinue",
        `validatorErrors: ${JSON.stringify(controllerResponse.validatorErrors)}. redirectRoute: ${
          controllerResponse.redirectRoute
        }`
      );
      return controllerResponse;
    }
    controllerResponse.redirectRoute = `/new/establishment-address-type`;

    if (edit) {
      if (controllerResponse.allValidationErrors) {
        delete controllerResponse.allValidationErrors["establishment_additional_trading_names"];
      }
      controllerResponse.redirectRoute = `/new/registration-summary`;
    }

    controllerResponse.cumulativeFullAnswers.establishment_trading_name =
      newAnswers.establishment_trading_name;

    logEmitter.emit(
      "functionSuccess",
      "trading-name-details.controller",
      "tradingNameDetailsContinue"
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "trading-name-details.controller",
      "tradingNameDetailsContinue",
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
 * @param {boolean} edit Flag indicating if request was submitted in edit mode
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const tradingNameDetailsSave = (currentPage, previousAnswers, newAnswers, edit) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    addressLookups: {},
    switches: {}
  };
  logEmitter.emit("functionCall", "trading-name-details.controller", "tradingNameDetailsSave");
  try {
    controllerResponse.cumulativeFullAnswers = previousAnswers;
    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(currentPage, { trading_name: newAnswers.trading_name }).errors
    );

    const validationErrorsKeys = Object.keys(controllerResponse.validatorErrors);
    if (validationErrorsKeys.length > 0) {
      // if there are errors, redirect back to the current page
      controllerResponse.redirectRoute = `/tradingname${currentPage}`;
      if (newAnswers.index) {
        controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
          `?id=${newAnswers.index}`
        );
      }
      if (edit) {
        const separator = controllerResponse.redirectRoute.indexOf("?") > 0 ? "&" : "?";
        controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
          `${separator}edit=establishment-trading-name`
        );
      }
      logEmitter.emit(
        "functionSuccessWith",
        "trading-name-details.controller",
        "tradingNameDetailsSave",
        `validatorErrors: ${JSON.stringify(controllerResponse.validatorErrors)}. redirectRoute: ${
          controllerResponse.redirectRoute
        }`
      );
      return controllerResponse;
    }

    const establishment_additional_trading_names =
      controllerResponse.cumulativeFullAnswers.establishment_additional_trading_names;

    const tradingName = newAnswers["trading_name"].trim();
    const tradingNameIndex = newAnswers["index"];
    controllerResponse.redirectRoute = `/new/establishment-trading-name`;

    if (establishment_additional_trading_names[tradingNameIndex]) {
      establishment_additional_trading_names[tradingNameIndex] = tradingName;
    } else {
      if (establishment_additional_trading_names.length < MAX_TRADING_NAMES) {
        establishment_additional_trading_names.push(tradingName);
      }
    }

    if (edit) {
      controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
        "?edit=establishment-trading-name"
      );
    }
    controllerResponse.cumulativeFullAnswers.establishment_additional_trading_names =
      establishment_additional_trading_names;
    delete controllerResponse.cumulativeFullAnswers.targettradingName;

    logEmitter.emit("functionSuccess", "trading-name-details.controller", "tradingNameDetailsSave");
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "trading-name-details.controller",
      "tradingNameDetailsSave",
      err
    );
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
const tradingNameDetailsDelete = (previousAnswers, newAnswers, edit) => {
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    addressLookups: {},
    switches: {}
  };
  logEmitter.emit("functionCall", "trading-name-details.controller", "tradingNameDetailsDelete");

  try {
    controllerResponse.cumulativeFullAnswers = previousAnswers;
    const establishment_additional_trading_names =
      controllerResponse.cumulativeFullAnswers.establishment_additional_trading_names;
    const tradingNameIndex = newAnswers["index"];

    controllerResponse.redirectRoute = `/new/establishment-trading-name`;
    if (
      establishment_additional_trading_names[tradingNameIndex] ||
      establishment_additional_trading_names[tradingNameIndex] === ""
    ) {
      establishment_additional_trading_names.splice(tradingNameIndex, 1);
    }

    if (edit) {
      controllerResponse.redirectRoute = controllerResponse.redirectRoute.concat(
        "?edit=establishment-trading-name"
      );
    }
    controllerResponse.cumulativeFullAnswers.establishment_additional_trading_names =
      establishment_additional_trading_names;
    delete controllerResponse.cumulativeFullAnswers.targetTradingName;

    logEmitter.emit(
      "functionSuccess",
      "trading-name-details.controller",
      "tradingNameDetailsDelete"
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "trading-name-details.controller",
      "tradingNameDetailsDelete",
      err
    );
    throw err;
  }
};

module.exports = {
  tradingNameDetailsContinue,
  tradingNameDetailsSave,
  tradingNameDetailsDelete
};
