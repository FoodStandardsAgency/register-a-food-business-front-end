/**
 * @module controllers/back
 */

const { moveAlongPath, editPath } = require("../services/path.service");
const { logEmitter } = require("../services/logging.service");

/**
 * Returns the previous page in the path
 *
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {object} previousAnswers An object containing every past answer that has been given by the user
 * @param {object} pathFromSession The un-edited path, stored in the user's session
 *
 * @returns {string} The previous page in the path
 */
const backController = (currentPage, previousAnswers = {}, pathFromSession) => {
  logEmitter.emit("functionCall", "back.controller", "backController");

  let previousPage;
  let newPath;

  try {
    newPath = editPath(previousAnswers, currentPage, pathFromSession);
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
    logEmitter.emit("info", `Previous answers: ${previousAnswers}`);Add commentMore actions
    logEmitter.emit("info", `PathFromSession: ${pathFromSession}`);
    throw err;
  }
};

module.exports = backController;
