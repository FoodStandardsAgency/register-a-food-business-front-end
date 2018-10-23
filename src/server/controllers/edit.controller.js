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

const checkIfValid = validatorErrors =>
  Object.keys(validatorErrors).length === 0;

const editController = (
  pathFromSession,
  editModeFirstPage,
  currentPage,
  cumulativeFullAnswers,
  cumulativeEditAnswers,
  newAnswers,
  switches
) => {
  const truthyCumulativeFullAnswers = cleanEmptiedAnswers(
    cumulativeFullAnswers,
    Object.values(newAnswers),
    currentPage
  );

  const truthyCumulativeEditAnswers = cleanEmptiedAnswers(
    cumulativeEditAnswers,
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

  if (valid) {
    // TODO JMB: Merge switchOffManualAddressInput into editPathInEditMode
    const newEditModePath = editPathInEditMode(
      newCumulativeFullAnswers,
      newCumulativeEditAnswers,
      pathFromSession,
      editModeFirstPage,
      currentPage
    );

    // cleanedInactiveFullAnswers = cleanInactivePathAnswers(
    //   newCumulativeFullAnswers,
    //   newEditModePath
    // );

    // cleanedInactiveEditAnswers = cleanInactivePathAnswers(
    //   newCumulativeEditAnswers,
    //   newEditModePath
    // );

    const nextPage = moveAlongEditPath(newEditModePath, currentPage, 1);

    redirectRoute = nextPage;
  } else {
    redirectRoute = currentPage;
  }

  const controllerResponse = {
    cumulativeFullAnswers: newCumulativeFullAnswers,
    cumulativeEditAnswers: newCumulativeEditAnswers,
    validatorErrors,
    switches: cleanedSwitches,
    redirectRoute
  };
  return controllerResponse;
};

module.exports = editController;
