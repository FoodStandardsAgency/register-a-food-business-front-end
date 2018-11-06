const { logEmitter } = require("./logging.service");

const editPath = (cumulativeFullAnswers, currentPage, pathFromSession) => {
  logEmitter.emit("functionCall", "path.service", "editPath");
  const pathPagesToSwitch = getPathPagesToSwitch(
    cumulativeFullAnswers,
    currentPage,
    pathFromSession
  );

  const newPath = JSON.parse(JSON.stringify(pathFromSession));

  pathPagesToSwitch.forEach(page => {
    newPath[page].on = true;
  });

  logEmitter.emit("functionSuccess", "path.service", "editPath");
  return newPath;
};

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
  pagesToSwitchFull.forEach(page => {
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

const moveAlongPath = (path, currentPage, movement) => {
  logEmitter.emit("functionCall", "path.service", "moveAlongPath");

  const activePath = Object.keys(path).filter(entry => {
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

const moveAlongEditPath = (editModePath, currentPage, movement) => {
  logEmitter.emit("functionCall", "path.service", "moveAlongEditPath");

  const activePath = Object.keys(editModePath).filter(entry => {
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

    const answerValuesAndTruthyKeys = allAnswerValues.concat(allAnswerKeys);

    answerValuesAndTruthyKeys.sort((a, b) => {
      return (
        Object.keys(allSwitches).indexOf(a) -
        Object.keys(allSwitches).indexOf(b)
      );
    });

    let pagesToSwitch = [];

    answerValuesAndTruthyKeys.forEach(valueOrKey => {
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

module.exports = {
  editPath,
  editPathInEditMode,
  moveAlongPath,
  moveAlongEditPath,
  getPathPagesToSwitch,
  switchOffManualAddressInput
};
