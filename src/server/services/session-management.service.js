const schema = require("./schema");
const { logEmitter } = require("./logging.service");

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
        cumulativeFullAnswers.operator_email
      ];

      const establishmentContactDetails = [
        cumulativeFullAnswers.establishment_primary_number,
        cumulativeFullAnswers.establishment_secondary_number,
        cumulativeFullAnswers.establishment_email
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
  cleanSwitches
};
