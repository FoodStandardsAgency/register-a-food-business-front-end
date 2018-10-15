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
  editMode,
  pathFromSession
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

    controllerResponse.cumulativeAnswers = Object.assign(
      {},
      cleanedPreviousAnswers,
      trimmedNewAnswers
    );

    controllerResponse.switches = Object.assign(
      {},
      cleanSwitches(controllerResponse.cumulativeAnswers, switches)
    );

    controllerResponse.validatorErrors = Object.assign(
      {},
      validate(currentPage, trimmedNewAnswers).errors
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
    const newPath = editPath(
      controllerResponse.cumulativeAnswers,
      currentPage,
      pathFromSession,
      editMode
    );

    // update the new path to switch off manual address input pages if the originator (currentPage) is one of the address select pages
    const updatedNewPath = switchOffManualAddressInput(newPath, currentPage);

    // remove any answers that are associated with an inactive page on the path
    controllerResponse.cumulativeAnswers = cleanInactivePathAnswers(
      controllerResponse.cumulativeAnswers,
      updatedNewPath
    );


    // create array of page names
    const pageNames = Object.keys(updatedNewPath);

    // filter array by on = true
    const activePageNames = pageNames.filter(page => updatedNewPath[page].on === true);

    // check if current page is at the end of this array
    const finalActivePage = activePageNames[activePageNames.length - 1];
    
    if (currentPage === finalActivePage) {
      if (editMode === true) {
        controllerResponse.redirectRoute = "/registration-summary";
      } else {
        controllerResponse.redirectRoute = "/submit";
      }
    } else {
      // else move to the next page in the path
      const nextPage = moveAlongPath(updatedNewPath, currentPage, 1);
      controllerResponse.redirectRoute = nextPage;
      if (editMode === true) {
        // if edit mode is on, persist the edit mode query when redirecting
        controllerResponse.redirectRoute += "?edit=on";
      }
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
