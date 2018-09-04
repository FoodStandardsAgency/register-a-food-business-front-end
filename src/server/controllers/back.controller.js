const { moveAlongPath, editPath } = require("../services/path.service");
const { logEmitter } = require("../services/logging.service");

const backController = (currentPage, previousAnswers = {}) => {
  logEmitter.emit("functionCall", "back.controller", "backController");

  let previousPage;
  let newPath;

  try {
    newPath = editPath(previousAnswers);
    previousPage = moveAlongPath(newPath, currentPage, -1);

    logEmitter.emit(
      "functionSuccessWith",
      "back.controller",
      "backController",
      `Previous page is ${previousPage}`
    );
    return previousPage;
  } catch (err) {
    logEmitter.emit("functionFail", "back.controller", "backController", err);
    throw err;
  }
};

module.exports = backController;
