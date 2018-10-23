const {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches
} = require("../services/session-management.service");
const { validate } = require("../services/validation.service");
const { trimAnswers } = require("../services/data-transform.service");
const {
  editPathInEditMode,
  moveAlongEditPath
} = require("../services/path.service");

const editBack = (
  pathFromSession,
  editModeFirstPage,
  currentPage,
  cumulativeFullAnswers,
  cumulativeEditAnswers
) => {
  logEmitter.emit("functionCall", "edit.controller", "editBack");

  const newEditModePath = editPathInEditMode(
    cumulativeFullAnswers,
    cumulativeEditAnswers,
    pathFromSession,
    editModeFirstPage,
    currentPage
  );

  const previousPage = moveAlongEditPath(newEditModePath, currentPage, -1);

  logEmitter.emit(
    "functionSuccessWith",
    "edit.controller",
    "editBack",
    `Previous page is ${previousPage}`
  );
  return previousPage;
};

const checkIfValid = validatorErrors =>
  Object.keys(validatorErrors).length === 0;

const editContinue = (
  pathFromSession,
  editModeFirstPage,
  currentPage,
  cumulativeFullAnswers,
  cumulativeEditAnswers,
  newAnswers,
  switches
) => {
  logEmitter.emit("functionCall", "edit.controller", "editContinue");

  const truthyCumulativeFullAnswers = cleanEmptiedAnswers(
    { ...cumulativeFullAnswers },
    Object.values(newAnswers),
    currentPage
  );

  const truthyCumulativeEditAnswers = cleanEmptiedAnswers(
    { ...cumulativeEditAnswers },
    Object.values(newAnswers),
    currentPage
  );

  const trimmedNewAnswers = trimAnswers(newAnswers);

  const newCumulativeFullAnswers = {
    ...truthyCumulativeFullAnswers,
    ...trimmedNewAnswers
  };

  const newCumulativeEditAnswers = {
    ...truthyCumulativeEditAnswers,
    ...trimmedNewAnswers
  };

  const cleanedSwitches = cleanSwitches(newCumulativeFullAnswers, switches);

  const validatorErrors = validate(currentPage, trimmedNewAnswers).errors;
  const valid = checkIfValid(validatorErrors);

  let redirectRoute;
  let cleanedInactiveFullAnswers;
  let cleanedInactiveEditAnswers;
  if (valid) {
    // TODO JMB: Merge switchOffManualAddressInput into editPathInEditMode
    const newEditModePath = editPathInEditMode(
      newCumulativeFullAnswers,
      newCumulativeEditAnswers,
      pathFromSession,
      editModeFirstPage,
      currentPage
    );

    cleanedInactiveFullAnswers = cleanInactivePathAnswers(
      newCumulativeFullAnswers,
      newEditModePath
    );

    cleanedInactiveEditAnswers = cleanInactivePathAnswers(
      newCumulativeEditAnswers,
      newEditModePath
    );

    const nextPage = moveAlongEditPath(newEditModePath, currentPage, 1);

    redirectRoute = nextPage;
  } else {
    redirectRoute = currentPage;
  }

  let cumulativeEditAnswersToReturn;
  let cumulativeFullAnswersToReturn;

  cumulativeFullAnswersToReturn =
    cleanedInactiveFullAnswers || newCumulativeFullAnswers;

  if (redirectRoute === "/registration-summary") {
    cumulativeEditAnswersToReturn = {};
  } else {
    cumulativeEditAnswersToReturn =
      cleanedInactiveEditAnswers || newCumulativeEditAnswers;
  }

  const controllerResponse = {
    cumulativeFullAnswers: cumulativeFullAnswersToReturn,
    cumulativeEditAnswers: cumulativeEditAnswersToReturn,
    validatorErrors,
    switches: cleanedSwitches,
    redirectRoute
  };

  logEmitter.emit(
    "functionSuccessWith",
    "edit.controller",
    "editContinue",
    `Next page is ${redirectRoute}`
  );
  return controllerResponse;
};

module.exports = { editContinue, editBack };
