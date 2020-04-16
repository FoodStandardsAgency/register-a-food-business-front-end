/**
 * Functions for cleaning and maintaining session data
 * @module services/session-management
 */

const schema = require("./schema");
const { logEmitter } = require("./logging.service");

/**
 * Deletes all answers that come from a page that is now inactive on the path
 *
 * @param {object} cumulativeFullAnswers An object containing every answer that has been given by the user
 * @param {object} path The edited path object with the correct enabled and disabled pages
 *
 * @returns {object} An answers object with all inactive path answers removed
 */
const cleanInactivePathAnswers = (cumulativeFullAnswers, path) => {
  logEmitter.emit(
    "functionCall",
    "session-management.service",
    "cleanInactivePathAnswers"
  );

  const cleanedAnswers = Object.assign({}, cumulativeFullAnswers);

  for (let answer in cleanedAnswers) {
    // find the page that this answer is from
    let pageOfAnswer;

    for (let page in schema) {
      if (schema[page].properties[answer]) {
        pageOfAnswer = page;
      }
    }

    // if that page is off in the given path, delete the answer
    if (path[pageOfAnswer] && path[pageOfAnswer].on === false) {
      delete cleanedAnswers[answer];
    }
  }

  logEmitter.emit(
    "functionSuccess",
    "session-management.service",
    "cleanInactivePathAnswers"
  );
  return cleanedAnswers;
};

/**
 * Deletes all answers that were previously given for the current page but are now falsy on a second submission
 *
 * @param {object} cumulativeFullAnswers An object containing every answer that has been given by the user
 * @param {object} newAnswersArray An object containing only the answers given on the most recent page
 * @param {string} currentPage The 'originator' page that the user has come from
 *
 * @returns {object} An answers object with all emptied answers removed
 */
const cleanEmptiedAnswers = (
  cumulativeFullAnswers,
  newAnswersArray,
  currentPage
) => {
  logEmitter.emit(
    "functionCall",
    "session-management.service",
    "cleanEmptiedAnswers"
  );
  const cleanedAnswers = Object.assign({}, cumulativeFullAnswers);

  for (let schemaDefinedAnswer in schema[currentPage].properties) {
    if (
      cleanedAnswers[schemaDefinedAnswer] &&
      newAnswersArray.indexOf(schemaDefinedAnswer) === -1
    ) {
      delete cleanedAnswers[schemaDefinedAnswer];
    }
  }

  logEmitter.emit(
    "functionSuccess",
    "session-management.service",
    "cleanEmptiedAnswers"
  );
  return cleanedAnswers;
};

/**
 * Sets switches under specific conditions
 *
 * @param {object} cumulativeFullAnswers An object containing every answer that has been given by the user
 * @param {object} switches The switches object from the user's session
 *
 * @returns {object} The edited switches object
 */
const cleanSwitches = (cumulativeFullAnswers, switches) => {
  logEmitter.emit(
    "functionCall",
    "session-management.service",
    "cleanSwitches"
  );

  const cleanedSwitches = Object.assign({}, switches);

  if (switches) {
    if (cleanedSwitches.reuseOperatorContactDetails !== undefined) {
      const operatorContactDetails = [
        cumulativeFullAnswers.operator_primary_number,
        cumulativeFullAnswers.operator_secondary_number,
        cumulativeFullAnswers.operator_email,
      ];

      const establishmentContactDetails = [
        cumulativeFullAnswers.establishment_primary_number,
        cumulativeFullAnswers.establishment_secondary_number,
        cumulativeFullAnswers.establishment_email,
      ];

      const operatorEstablishmentDetailsAreDifferent =
        JSON.stringify(operatorContactDetails) !==
        JSON.stringify(establishmentContactDetails);

      if (operatorEstablishmentDetailsAreDifferent) {
        cleanedSwitches.reuseOperatorContactDetails = false;
      }
    }
  }

  logEmitter.emit(
    "functionSuccess",
    "session-management.service",
    "cleanSwitches"
  );
  return cleanedSwitches;
};

module.exports = {
  cleanInactivePathAnswers,
  cleanEmptiedAnswers,
  cleanSwitches,
};
