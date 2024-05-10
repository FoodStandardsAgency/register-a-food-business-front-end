/**
 * @module controllers/edit
 */

const { logEmitter } = require("../services/logging.service");
const {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches
} = require("../services/session-management.service");
const { validate } = require("../services/validation.service");
const { trimAnswers } = require("../services/data-transform.service");
const { editPathInEditMode, moveAlongEditPath } = require("../services/path.service");

/**
 * Returns the previous page in the edit-mode path
 *
 * @param {object} pathFromSession The un-edited path, stored in the user's session
 * @param {string} editModeFirstPage The first page in the edit-mode path
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {object} cumulativeFullAnswers An object containing every answer that has been given by the user
 * @param {object} cumulativeEditAnswers An object containing every answer that has been given in this edit-mode path by the user
 *
 * @returns {string} The previous page in the edit-mode path
 */
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

const checkIfValid = (validatorErrors) => Object.keys(validatorErrors).length === 0;

/**
 * Returns an object containing validator errors (if present), the redirect route (e.g. the next page in the edit-mode path),
 * the new value of the cumulative answers object, and the new value of the switches object.
 *
 * @param {object} pathFromSession The un-edited path, stored in the user's session
 * @param {string} editModeFirstPage The first page in the edit-mode path
 * @param {string} currentPage The 'originator' page that the user has come from
 * @param {object} cumulativeFullAnswers An object containing every past answer that has been given by the user
 * @param {object} cumulativeEditAnswers An object containing every past answer that has been given in this edit-mode path by the user
 * @param {object} newAnswers An object containing new answers from the current page
 * @param {object} switches The global switches object
 * @param {object} allValidationErrors An object containing validation errors collected from all active pages
 *
 * @returns {object} Values for the router to store/update in the session and the page to redirect to.
 */
const editContinue = (
  pathFromSession,
  editModeFirstPage,
  currentPage,
  cumulativeFullAnswers,
  cumulativeEditAnswers,
  newAnswers,
  switches,
  allValidationErrors
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
  let newAllValidationErrors = Object.assign({}, allValidationErrors);
  let transformedNewAnswers = Object.assign({}, newAnswers);
  if (valid) {
    // Account for difference in field names and their transform property names
    // to allow for validation message deletion
    if (transformedNewAnswers.day && transformedNewAnswers.month && transformedNewAnswers.year) {
      transformedNewAnswers.establishment_opening_date = "validated";
    }
    if (
      transformedNewAnswers.operator_postcode ||
      transformedNewAnswers.operator_address_selected
    ) {
      transformedNewAnswers.operator_postcode_find = "validated";
    }
    if (
      transformedNewAnswers.establishment_postcode ||
      transformedNewAnswers.establishment_address_selected
    ) {
      transformedNewAnswers.establishment_postcode_find = "validated";
    }

    Object.keys(transformedNewAnswers).forEach((validAnswerKey) => {
      delete newAllValidationErrors[validAnswerKey];
    });
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

  cumulativeFullAnswersToReturn = cleanedInactiveFullAnswers || newCumulativeFullAnswers;

  if (redirectRoute === "/registration-summary") {
    cumulativeEditAnswersToReturn = {};
  } else {
    cumulativeEditAnswersToReturn = cleanedInactiveEditAnswers || newCumulativeEditAnswers;
  }
  const controllerResponse = {
    cumulativeFullAnswers: cumulativeFullAnswersToReturn,
    cumulativeEditAnswers: cumulativeEditAnswersToReturn,
    validatorErrors,
    newAllValidationErrors,
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
