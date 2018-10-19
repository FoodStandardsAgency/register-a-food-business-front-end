const { pipe, ifElse } = require("ramda");
const {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches
} = require("../services/session-management.service");
const { validate } = require("../services/validation.service");
const {
  moveAlongPath,
  editPath,
  switchOffManualAddressInput
} = require("../services/path.service");

const combineAnswers = () => {};

const checkIfValid = validatorErrors =>
  Object.keys(validatorErrors).length === 0;

const checkIfEndOfEditRoute = data => {};

const dataFormatting = pipe(
  trimAnswers,
  cleanEmptiedAnswers,
  combineAnswers,
  cleanSwitches,
  validate
);

const validActions = pipe(
  editPath,
  switchOffManualAddressInput,
  moveAlongPath,
  ifElse(checkIfEndOfEditRoute, endOfEditRoute, notEndOfEditRoute)
);

const endOfEditRoute = pipe(setRedirectToRegistrationSummary);

const notEndOfEditRoute = pipe(setRedirectToNextPage);

const editController = (
  pathFromSession,
  editModePage,
  currentPage,
  previousAnswers,
  newAnswers,
  switches
) => {
  const trimmedNewAnswers = trimAnswers(newAnswers);

  const emptiedPreviousAnswers = cleanEmptiedAnswers(
    previousAnswers,
    Object.values(trimmedNewAnswers),
    currentPage
  );

  const cumulativeEditAnswers = combineAnswers(
    emptiedPreviousAnswers,
    trimmedNewAnswers
  );

  const cleanedSwitches = cleanSwitches(cumulativeEditAnswers, switches);

  const validatorErrors = validate(currentPage, trimmedNewAnswers).errors;

  const valid = checkIfValid(validatorErrors);

  let redirectRoute;
  if (valid) {
    const newEditPath = editPathInEditMode(
      cumulativeEditAnswers,
      editModePage,
      currentPage,
      pathFromSession
    );

    // TODO JMB: Merge switchOffManualAddressInput into editPathInEditMode

    const nextPage = moveAlongEditPath(newEditPath, currentPage, 1);

    redirectRoute = nextPage;
  } else {
    redirectRoute = currentPage;
  }

  const controllerResponse = {
    redirectRoute,
    cumulativeEditAnswers,
    validatorErrors,
    switches: cleanedSwitches
  };
  return controllerResponse;
};

module.exports = editController;
