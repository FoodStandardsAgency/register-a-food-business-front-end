const {
  cleanEmptiedAnswers
} = require("../services/session-management.service");
const { changeSwitch } = require("../services/switches.service");
const { logEmitter } = require("../services/logging.service");

const switchesController = (
  currentSwitchState,
  action,
  previousAnswers,
  newAnswers,
  currentPage
) => {
  logEmitter.emit("functionCall", "switches.controller", "switchesController");

  const controllerResponse = {
    cumulativeAnswers: {},
    newSwitchState: undefined
  };

  try {
    const newState = changeSwitch(action, currentSwitchState);

    controllerResponse.newSwitchState = newState;

    const newAnswersArray = Object.values(Object.assign({}, newAnswers));

    let cleanedPreviousAnswers = Object.assign({}, previousAnswers);

    if (newAnswersArray.length > 0) {
      // remove any answers that were previously given a truthy value but have since been emptied
      cleanedPreviousAnswers = cleanEmptiedAnswers(
        previousAnswers,
        newAnswersArray,
        currentPage
      );
    }

    controllerResponse.cumulativeAnswers = Object.assign(
      {},
      cleanedPreviousAnswers,
      newAnswers
    );

    logEmitter.emit(
      "functionSuccess",
      "switches.controller",
      "switchesController"
    );
    return controllerResponse;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "switches.controller",
      "switchesController",
      err
    );
    throw err;
  }
};

module.exports = switchesController;
