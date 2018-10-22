const {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches
} = require("../services/session-management.service");
const { validate } = require("../services/validation.service");
const { trimAnswers } = require("../services/data-transform.service");
const {
  editPath,
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
  // clean emptied previous answers for both cumulative and editPath answers (using the new answers)
  // then combine the new answers from that page to both the cumulative answers and the editPath answers
  // using the cumulative answers, get the new 'full' updated path on or offs ---- editPathInEditMode
  // using the editPath answers only, set inEditPath true to the relevant pages ---- editPathInEditMode
  // then clean inactive page answers on both the cumulative answers and the editPath answers --- cleanInactivePathAnswers x2
  // find the next page on the edit path using inEditPath true/false --- moveAlongEditPath
  // return the next page name, the cumulative full answers, and the cumulative edit answers

  const emptiedCumulativeFullAnswers = cleanEmptiedAnswers(
    cumulativeFullAnswers,
    Object.values(newAnswers),
    currentPage
  );

  const emptiedCumulativeEditAnswers = cleanEmptiedAnswers(
    cumulativeEditAnswers,
    Object.values(newAnswers),
    currentPage
  );

  const trimmedNewAnswers = trimAnswers(newAnswers);

  const newCumulativeFullAnswers = {
    ...emptiedCumulativeFullAnswers,
    ...trimmedNewAnswers
  };

  const newCumulativeEditAnswers = {
    ...emptiedCumulativeEditAnswers,
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
    cumulativeFullAnswers:
      cleanedInactiveFullAnswers || newCumulativeFullAnswers,
    cumulativeEditAnswers:
      cleanedInactiveEditAnswers || newCumulativeEditAnswers,
    validatorErrors,
    switches: cleanedSwitches,
    redirectRoute
  };
  return controllerResponse;
};

module.exports = editController;
