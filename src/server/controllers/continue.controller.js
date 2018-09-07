const {
  moveAlongPath,
  editPath,
  switchOffManualAddressInput
} = require("../services/path.service");
const { validate } = require("../services/validation.service");
const { logEmitter } = require("../services/logging.service");
const { statusEmitter } = require("../services/statusEmitter.service");
const {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches
} = require("../services/session-management.service");

const continueController = (
  currentPage,
  previousAnswers,
  newAnswers = {},
  switches,
  editMode
) => {
  logEmitter.emit("functionCall", "continue.controller", "continueController");
  const controllerResponse = {
    validatorErrors: {},
    redirectRoute: null,
    cumulativeAnswers: {},
    switches: {}
  };

  try {
    if (currentPage === "/index") {
      statusEmitter.emit("incrementCount", "registrationsStarted");
    }

    const newAnswersArray = Object.values(newAnswers);

    let cleanedPreviousAnswers = Object.assign({}, previousAnswers);

    // remove any answers that were previously given a truthy value but have since been emptied
    cleanedPreviousAnswers = cleanEmptiedAnswers(
      previousAnswers,
      newAnswersArray,
      currentPage
    );

    controllerResponse.cumulativeAnswers = Object.assign(
      {},
      cleanedPreviousAnswers,
      newAnswers
    );

    controllerResponse.switches = Object.assign(
      {},
      cleanSwitches(controllerResponse.cumulativeAnswers, switches)
    );

    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(currentPage, newAnswers).errors
    );

    if (Object.keys(controllerResponse.validatorErrors).length > 0) {
      // if there are errors, redirect back to the current page
      controllerResponse.redirectRoute = currentPage;

      if (editMode === true) {
        // if edit mode is on, persist the edit mode query when redirecting
        controllerResponse.redirectRoute += "?edit=on";
      }
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

    if (editMode === true) {
      // if edit mode is on, redirect to the summary page
      controllerResponse.redirectRoute = "/registration-summary";
      logEmitter.emit(
        "functionSuccessWith",
        "continue.controller",
        "continueController",
        `editMode is true. redirectRoute: ${controllerResponse.redirectRoute}`
      );
      return controllerResponse;
    }

    // get the new path based on the answers that have been given
    const newPath = editPath(controllerResponse.cumulativeAnswers);

    // update the new path to switch off manual address input pages if the originator (currentPage) is one of the address select pages
    const updatedNewPath = switchOffManualAddressInput(newPath, currentPage);

    // remove any answers that are associated with an inactive page on the path
    controllerResponse.cumulativeAnswers = cleanInactivePathAnswers(
      controllerResponse.cumulativeAnswers,
      updatedNewPath
    );

    if (
      Object.keys(updatedNewPath).indexOf(currentPage) ===
      Object.keys(updatedNewPath).length - 1
    ) {
      // else if the current page is at the end of the path, redirect to the submit route
      controllerResponse.redirectRoute = "/submit";
    } else {
      // else move to the next page in the path
      const nextPage = moveAlongPath(updatedNewPath, currentPage, 1);

      controllerResponse.redirectRoute = nextPage;
    }
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
