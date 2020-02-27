/**
 * @module controllers/continue
 */

const {
  moveAlongPath,
  editPath,
  switchOffManualAddressInput,
  switchOffCompanyAndCharityDetails
} = require("../services/path.service");
const { validate } = require("../services/validation.service");
const { logEmitter } = require("../services/logging.service");
const { statusEmitter } = require("../services/statusEmitter.service");
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
    redirectRoute: null,
    cumulativeFullAnswers: {},
    switches: {}
  };

  try {
    if (currentPage === "/index") {
      statusEmitter.emit("incrementCount", "registrationsStarted");
    }

    const trimmedNewAnswers = JSON.parse(JSON.stringify(newAnswers));

    for (let answer in trimmedNewAnswers) {
      trimmedNewAnswers[answer] = trimmedNewAnswers[answer].trim();
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
        `validatorErrors: ${JSON.stringify(
          controllerResponse.validatorErrors
        )}. redirectRoute: ${controllerResponse.redirectRoute}`
      );
      return controllerResponse;
    }

    // get the new path based on the answers that have been given
    const newPath = editPath(
      controllerResponse.cumulativeFullAnswers,
      currentPage,
      pathFromSession
    );

    // update the new path to switch off manual address input pages if the originator (currentPage) is one of the address select pagees
    // and switch off representative registration role path when changed to Sole trader
    const updatedNewPath = switchOffCompanyAndCharityDetails(
      trimmedNewAnswers,
      switchOffManualAddressInput(newPath, currentPage)
    );

    // remove any answers that are associated with an inactive page on the path
    controllerResponse.cumulativeFullAnswers = cleanInactivePathAnswers(
      controllerResponse.cumulativeFullAnswers,
      updatedNewPath
    );

    // else move to the next page in the path
    const nextPage = moveAlongPath(updatedNewPath, currentPage, 1);
    controllerResponse.redirectRoute = nextPage;

    logEmitter.emit(
      "functionSuccessWith",
      "continue.controller",
      "continueController",
      `redirectRoute: ${controllerResponse.redirectRoute}`
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "continue.controller",
      "continueController",
      err
    );
    throw err;
  }
};

module.exports = continueController;
