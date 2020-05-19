/**
 * Functions for editing and moving along the path
 * @module services/path
 */

const { logEmitter } = require("./logging.service");

/**
 * Creates a version of the path object with the correct pages enabled, based on the user's cumulative answers.
 *
 * @param {object} cumulativeFullAnswers An object containing every answer that has been given by the user
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {object} pathFromSession The un-edited path, stored in the user's session
 *
 * @returns {object} The edited path object
 */
const editPath = (cumulativeFullAnswers, currentPage, pathFromSession) => {
  logEmitter.emit("functionCall", "path.service", "editPath");
  const pathPagesToSwitch = getPathPagesToSwitch(
    cumulativeFullAnswers,
    currentPage,
    pathFromSession
  );

  const newPath = JSON.parse(JSON.stringify(pathFromSession));

  pathPagesToSwitch.forEach((page) => {
    newPath[page].on = true;
  });

  logEmitter.emit("functionSuccess", "path.service", "editPath");
  return newPath;
};

/**
 * Creates a version of the path object during 'edit mode', which is enabled after the user has
 * clicked one of the 'Change' buttons on the summary page.
 * Enables pages for the 'edit mode' sub-path, based on the user's cumulative edit mode answers.
 *
 * @param {object} cumulativeFullAnswers An object containing every answer that has been given by the user
 * @param {object} cumulativeEditAnswers An object containing every answer that has been given by the user during the 'edit mode' sub-path
 * @param {object} pathFromSession The un-edited path, stored in the user's session
 * @param {string} editModeFirstPage The first page in the 'edit mode' sub-path, pulled from the URL query
 * @param {string} currentPage The 'originator' page that the user has come from
 *
 * @returns {object} The edited path object
 */
const editPathInEditMode = (
  cumulativeFullAnswers,
  cumulativeEditAnswers,
  pathFromSession,
  editModeFirstPage,
  currentPage
) => {
  logEmitter.emit("functionCall", "path.service", "editPathInEditMode");

  const pagesToSwitchFull = getPathPagesToSwitch(
    cumulativeFullAnswers,
    currentPage,
    pathFromSession
  );
  const pagesToSwitchInEdit = getPathPagesToSwitch(
    cumulativeEditAnswers,
    currentPage,
    pathFromSession
  );

  const newPath = JSON.parse(JSON.stringify(pathFromSession));
  pagesToSwitchFull.forEach((page) => {
    newPath[page].on = true;
    if (pagesToSwitchInEdit.includes(page)) {
      newPath[page].inEditPath = true;
    } else {
      newPath[page].inEditPath = false;
    }
  });

  newPath[editModeFirstPage].inEditPath = true;

  logEmitter.emit("functionSuccess", "path.service", "editPathInEditMode");
  return newPath;
};

/**
 * Calculates the the next or previous page in the path, based on the active path (enabled pages), the current page, and the given 'movement'.
 *
 * @param {object} path The edited path object with the correct enabled and disabled pages
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {number} movement The requested movement, in number of pages, from the current page. For example 1 or -1
 *
 * @returns {string} The page that the user should see next
 */
const moveAlongPath = (path, currentPage, movement) => {
  logEmitter.emit("functionCall", "path.service", "moveAlongPath");

  const activePath = Object.keys(path).filter((entry) => {
    return path[entry].on === true;
  });

  const currentIndex = activePath.indexOf(currentPage);

  const nextPage = activePath[currentIndex + movement];

  if (nextPage) {
    logEmitter.emit(
      "functionSuccessWith",
      "path.service",
      "moveAlongPath",
      `Page to move to in path: "${nextPage}"`
    );
    return nextPage;
  } else {
    if (movement > 0) {
      logEmitter.emit(
        "functionSuccessWith",
        "path.service",
        "moveAlongPath",
        "End of path. Moving to '/submit'."
      );
      return "/submit";
    } else {
      const err = `Attempt was made to move ${movement} pages from "${currentPage}".
      This moves beyond the boundaries of the path, so the page does not exist.
      `;
      logEmitter.emit("functionFail", "path.service", "moveAlongPath", err);
      throw new Error(err);
    }
  }
};

/**
 * Calculates the the next or previous page in the 'edit mode' sub-path, based on the active path (enabled pages), the current page, and the given 'movement'.
 *
 * @param {object} path The edited path object with the correct enabled and disabled 'edit mode' sub-path pages
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {number} movement The requested movement, in number of pages, from the current page. For example 1 or -1
 *
 * @returns {string} The page that the user should see next
 */
const moveAlongEditPath = (editModePath, currentPage, movement) => {
  logEmitter.emit("functionCall", "path.service", "moveAlongEditPath");

  const activePath = Object.keys(editModePath).filter((entry) => {
    return editModePath[entry].inEditPath === true;
  });

  const currentIndex = activePath.indexOf(currentPage);

  const nextPage = activePath[currentIndex + movement];

  if (nextPage) {
    logEmitter.emit(
      "functionSuccessWith",
      "path.service",
      "moveAlongEditPath",
      `Page to move to in path: "${nextPage}"`
    );
    return nextPage;
  } else {
    if (movement > 0) {
      logEmitter.emit(
        "functionSuccessWith",
        "path.service",
        "moveAlongEditPath",
        "End of edit path. Moving to '/registration-summary'."
      );
      return "/registration-summary";
    } else {
      const err = `Attempt was made to move backwards from "${currentPage}".
      This moves beyond the boundaries of the path, so the page does not exist.
      `;
      logEmitter.emit("functionFail", "path.service", "moveAlongEditPath", err);
      throw new Error(err);
    }
  }
};

/**
 * Calculates an array of pages in the given path that should be enabled, based on the user's cumulative answers.
 *
 * @param {object} cumulativeFullAnswers An object containing every answer that has been given by the user
 * @param {string} currentPage CURRENTLY OBSOLETE
 * @param {object} pathFromSession The un-edited path, stored in the user's session
 *
 * @returns {array} The pages that should be enabled
 */
const getPathPagesToSwitch = (
  cumulativeFullAnswers,
  currentPage,
  pathFromSession
) => {
  logEmitter.emit("functionCall", "path.service", "getPathPagesToSwitch");

  try {
    if (!cumulativeFullAnswers || typeof cumulativeFullAnswers !== "object") {
      throw new Error(`
      path.service.js getPathPagesToSwitch(): the cumulativeFullAnswers argument is either missing or is not an object.
    `);
    }

    // Get all properties with the properties they switch
    const allSwitches = {};

    for (let page in pathFromSession) {
      Object.assign(allSwitches, pathFromSession[page].switches);
    }

    const allAnswerValues = Object.values(cumulativeFullAnswers);
    const allAnswerKeys = [];

    for (let key in cumulativeFullAnswers) {
      if (cumulativeFullAnswers[key] !== "") {
        allAnswerKeys.push(key);
      }
    }

    // Switching on values without also referencing key is risky since an unrelated value
    // could clash e.g. Sole trader as a role would clash with Sole trader that happens to be
    // establishment name
    const answerValuesAndTruthyKeys = allAnswerValues.concat(allAnswerKeys);

    // I'm really not clear what impact sorting has here
    answerValuesAndTruthyKeys.sort((a, b) => {
      return (
        Object.keys(allSwitches).indexOf(a) -
        Object.keys(allSwitches).indexOf(b)
      );
    });

    let pagesToSwitch = [];

    answerValuesAndTruthyKeys.forEach((valueOrKey) => {
      if (allSwitches[valueOrKey]) {
        pagesToSwitch.push(...Object.keys(allSwitches[valueOrKey]));
      }
    });

    // remove duplicates
    pagesToSwitch = [...new Set(pagesToSwitch)];

    logEmitter.emit("functionSuccess", "path.service", "getPathPagesToSwitch");
    return pagesToSwitch;
  } catch (err) {
    logEmitter.emit(
      "functionFail",
      "path.service",
      "getPathPagesToSwitch",
      err
    );
    throw err;
  }
};

/**
 * A workaround function to disable manual address input pages if the user has successfully found an address from the lookup.
 *
 * @param {object} newPath The path object, already edited to enable pages
 * @param {string} currentPage The 'originator' page that the user has come from
 *
 * @returns {object} The edited path
 */
const switchOffManualAddressInput = (newPath, currentPage) => {
  logEmitter.emit(
    "functionCall",
    "path.service",
    "switchOffManualAddressInput"
  );

  const manualAddressSwitchedPath = JSON.parse(JSON.stringify(newPath));

  if (currentPage === "/establishment-address-select") {
    manualAddressSwitchedPath["/establishment-address-manual"].on = false;
  }

  if (currentPage === "/operator-address-select") {
    manualAddressSwitchedPath["/operator-address-manual"].on = false;
  }

  logEmitter.emit(
    "functionSuccess",
    "path.service",
    "switchOffManualAddressInput"
  );
  return manualAddressSwitchedPath;
};

/**
 * A workaround function to disable company and charity details input pages if the user has gone
 * back and selected Sole trader after having previously selected Representative registration role.
 *
 * @param {object} newPath The path object, already edited to enable pages
 * @param {string} newAnswers The newAnswers object containg the answers going forward.
 *
 * @returns {object} The edited path
 */
const switchOffCompanyAndCharityDetails = (newAnswers, newPath) => {
  logEmitter.emit(
    "functionCall",
    "path.service",
    "switchOffCompanyAndCharityDetails"
  );

  const companyAndCharitySwitchedPath = JSON.parse(JSON.stringify(newPath));

  if (
    newAnswers.registration_role &&
    newAnswers.registration_role !== "Representative"
  ) {
    companyAndCharitySwitchedPath["/operator-charity-details"].on = false;
    companyAndCharitySwitchedPath["/operator-company-details"].on = false;
  }
  return companyAndCharitySwitchedPath;
};

module.exports = {
  editPath,
  editPathInEditMode,
  moveAlongPath,
  moveAlongEditPath,
  getPathPagesToSwitch,
  switchOffManualAddressInput,
  switchOffCompanyAndCharityDetails
};
