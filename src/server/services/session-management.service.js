const schema = require("./schema");

const cleanInactivePathAnswers = (cumulativeAnswers, path) => {
  logEmitter.emit(
    "functionCall",
    "session-management.service",
    "cleanInactivePathAnswers"
  );

  const cleanedAnswers = Object.assign({}, cumulativeAnswers);

  for (let answer in cleanedAnswers) {
    let pageOfAnswer;

    for (let page in schema) {
      if (schema[page].properties[answer]) {
        pageOfAnswer = page;
      }
    }

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
  cumulativeAnswers,
  newAnswersArray,
  currentPage
) => {
  logEmitter.emit(
    "functionCall",
    "session-management.service",
    "cleanEmptiedAnswers"
  );
  const cleanedAnswers = Object.assign({}, cumulativeAnswers);

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

const cleanSwitches = (cumulativeAnswers, switches) => {
  logEmitter.emit(
    "functionCall",
    "session-management.service",
    "cleanSwitches"
  );

  const cleanedSwitches = Object.assign({}, switches);

  if (switches) {
    if (cleanedSwitches.reuseOperatorContactDetails !== undefined) {
      const operatorContactDetails = [
        cumulativeAnswers.operator_primary_number,
        cumulativeAnswers.operator_secondary_number,
        cumulativeAnswers.operator_email
      ];

      const establishmentContactDetails = [
        cumulativeAnswers.establishment_primary_number,
        cumulativeAnswers.establishment_secondary_number,
        cumulativeAnswers.establishment_email
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
