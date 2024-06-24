/**
 * @module controllers/continue
 */

const {
  moveAlongPath,
  editPath,
  switchOffManualAddressInput,
  switchOffCompanyAndCharityDetails
} = require("../services/path.service");
const { validate, revalidateAllAnswers } = require("../services/validation.service");
const { logEmitter } = require("../services/logging.service");
const {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches
} = require("../services/session-management.service");

/**
 * Returns an object containing validator errors (if present), the redirect route (e.g. the next page),
 * the new value of the cumulative answers object, and the new value of the switches object.
 *
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {object} previousAnswers An object containing every past answer that has been given by the user
 * @param {object} newAnswers An object containing new answers from the current page
 * @param {object} switches The global switches object
 * @param {object} pathFromSession The un-edited path, stored in the user's session
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const continueController = (
  currentPage,
  previousAnswers,
  newAnswers = {},
  switches,
  pathFromSession
) => {
  logEmitter.emit("functionCall", "continue.controller", "continueController");
  const controllerResponse = {
    validatorErrors: {},
    allValidationErrors: {},
    redirectRoute: null,
    cumulativeFullAnswers: {},
    switches: {}
  };

  try {
    const trimmedNewAnswers = JSON.parse(JSON.stringify(newAnswers));

    initialiseArrays(trimmedNewAnswers);

    for (let answer in trimmedNewAnswers) {
      if (typeof trimmedNewAnswers[answer] === "string") {
        trimmedNewAnswers[answer] = trimmedNewAnswers[answer].trim();
      }
    }

    const trimmedNewAnswersArray = Object.values(trimmedNewAnswers);

    let cleanedPreviousAnswers = Object.assign({}, previousAnswers);

    // remove any answers that were previously given a truthy value but have since been emptied
    cleanedPreviousAnswers = cleanEmptiedAnswers(
      previousAnswers,
      trimmedNewAnswersArray,
      currentPage
    );

    controllerResponse.cumulativeFullAnswers = Object.assign(
      {},
      cleanedPreviousAnswers,
      trimmedNewAnswers
    );

    controllerResponse.switches = Object.assign(
      {},
      cleanSwitches(controllerResponse.cumulativeFullAnswers, switches)
    );

    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(currentPage, trimmedNewAnswers).errors
    );

    if (Object.keys(controllerResponse.validatorErrors).length > 0) {
      // if there are errors, redirect back to the current page
      controllerResponse.redirectRoute = currentPage;

      logEmitter.emit(
        "functionSuccessWith",
        "continue.controller",
        "continueController",
        `validatorErrors: ${JSON.stringify(controllerResponse.validatorErrors)}. redirectRoute: ${
          controllerResponse.redirectRoute
        }`
      );
      return controllerResponse;
    }

    // get the new path based on the answers that have been given
    const newPath = editPath(
      controllerResponse.cumulativeFullAnswers,
      currentPage,
      pathFromSession
    );

    const activePath = Object.keys(newPath).filter((entry) => {
      return newPath[entry].on === true && entry !== "/declaration";
    });

    if (currentPage === "/registration-summary") {
      Object.assign(
        controllerResponse.allValidationErrors,
        revalidateAllAnswers(activePath, previousAnswers).errors
      );

      if (Object.keys(controllerResponse.allValidationErrors).length > 0) {
        controllerResponse.redirectRoute = currentPage;
        return controllerResponse;
      }
    }

    // update the new path to switch off manual address input pages if the originator (currentPage) is one of the address select pagees
    const updatedNewPathManual = switchOffManualAddressInput(newPath, currentPage);

    // update the new path to switch off representative registration role path when changed to Sole trader
    const updatedNewPath = switchOffCompanyAndCharityDetails(
      trimmedNewAnswers,
      updatedNewPathManual
    );

    // remove any answers that are associated with an inactive page on the path
    controllerResponse.cumulativeFullAnswers = cleanInactivePathAnswers(
      controllerResponse.cumulativeFullAnswers,
      updatedNewPath
    );

    // else move to the next page in the path
    const nextPage = moveAlongPath(updatedNewPath, currentPage, 1);
    controllerResponse.redirectRoute = nextPage;

    if (nextPage === "/registration-summary") {
      Object.assign(
        controllerResponse.allValidationErrors,
        revalidateAllAnswers(activePath, controllerResponse.cumulativeFullAnswers).errors
      );
    }

    logEmitter.emit(
      "functionSuccessWith",
      "continue.controller",
      "continueController",
      `redirectRoute: ${controllerResponse.redirectRoute}`
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit("functionFail", "continue.controller", "continueController", err);
    throw err;
  }
};

/**
 * Initializes arrays for specific keys in the answers object.
 * If the answer is not a string, it makes it an array of 0 length.
 * If the key is one of business-scale, food-type, or processing-activities, groups the strings into an array.
 * If it's already an array, it does nothing.
 *
 * @param {object} answers The answers object to be initialized
 */

const initialiseArrays = (answers) => {
  const keysToConvert = ["business_scale", "food_type", "processing_activities"];

  let updatedAnswers = { ...answers };
  keysToConvert.forEach((key) => {
    if (updatedAnswers.hasOwnProperty(key)) {
      if (!updatedAnswers[key]) {
        updatedAnswers[key] = [];
      } else if (typeof updatedAnswers[key] === "string") {
        updatedAnswers[key] = [updatedAnswers[key]];
      }
    }
  });

  return updatedAnswers;
};

module.exports = continueController;
