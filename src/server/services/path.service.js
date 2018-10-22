const { logEmitter } = require("./logging.service");

const editPathInEditMode = (
  cumulativeFullAnswers,
  cumulativeEditAnswers,
  pathFromSession,
  editModeFirstPage,
  currentPage
) => {
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

  return newPath;
};

// find the next page on the edit path using inEditPath true/false --- moveAlongEditPath
// TODO JMB: Merge 'is last page in path' into moveAlongEditPath
const moveAlongEditPath = (editModePath, currentPage, movement) => {};

const moveAlongPath = (path, currentPage, movement) => {
  logEmitter.emit("functionCall", "path.service", "moveAlongPath");

  try {
    const activePath = Object.keys(path).filter(entry => {
      return path[entry].on === true;
    });

    const currentIndex = activePath.indexOf(currentPage);

    const nextPage = activePath[currentIndex + (movement || 0)];

    if (nextPage) {
      logEmitter.emit(
        "functionSuccessWith",
        "path.service",
        "moveAlongPath",
        `Page to move to in path: "${nextPage}"`
      );
      return nextPage;
    } else {
      throw new Error(`
      path.service.js moveAlongPath(): Attempt was made to move "${movement}" pages from "${currentPage}".
      This moves beyond the boundaries of the path, so the page does not exist.
      Check the routing service, path JSON, and the form action on "${currentPage}".
    `);
    }
  } catch (err) {
    logEmitter.emit("functionFail", "path.service", "moveAlongPath", err);
    throw err;
  }
};

const editPath = (cumulativeAnswers, currentPage, pathFromSession) => {
  logEmitter.emit("functionCall", "path.service", "editPath");
  const pathPagesToSwitch = getPathPagesToSwitch(
    cumulativeAnswers,
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

const getPathPagesToSwitch = (
  cumulativeAnswers,
  currentPage,
  pathFromSession
) => {
  logEmitter.emit("functionCall", "path.service", "getPathPagesToSwitch");

  try {
    if (!cumulativeAnswers || typeof cumulativeAnswers !== "object") {
      throw new Error(`
      path.service.js getPathPagesToSwitch(): the cumulativeAnswers argument is either missing or is not an object.
    `);
    }

    const currentIndex = Object.keys(pathFromSession).indexOf(currentPage);
    const pagesUpToAndIncludingCurrentPage = Object.keys(pathFromSession).slice(
      0,
      currentIndex + 1
    );
    const allSwitches = {};

    for (let page in pathFromSession) {
      if (pagesUpToAndIncludingCurrentPage.indexOf(page) !== -1) {
        Object.assign(allSwitches, pathFromSession[page].switches);
      }
    }

    const allAnswerValues = Object.values(cumulativeAnswers);
    const allAnswerKeys = [];

    for (let key in cumulativeAnswers) {
      if (cumulativeAnswers[key] !== "") {
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
  moveAlongPath,
  getPathPagesToSwitch,
  editPath,
  switchOffManualAddressInput,
  moveAlongEditPath,
  editPathInEditMode
};
