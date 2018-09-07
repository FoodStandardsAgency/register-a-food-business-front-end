const { logEmitter } = require("./logging.service");

const getCurrentStatus = () => ({
  registrationsStarted: 0,
  submissionsSucceeded: 0,
  submissionsFailed: 0,
  addressLookups: 0,
  mostRecentSubmitSucceeded: true,
  mostRecentAddressLookupSucceeded: true
});

const status = getCurrentStatus();

const getStatus = statusName => {
  logEmitter.emit("functionCall", "status.service", "getStatus");

  if (statusName) {
    logEmitter.emit(
      "functionSuccessWith",
      "status.service",
      "getStatus",
      `Returning status of "${status[statusName]}"`
    );
    return status[statusName];
  } else {
    logEmitter.emit(
      "functionSuccessWith",
      "status.service",
      "getStatus",
      `No status name provided. Returning all status values.`
    );
    return status;
  }
};

const setStatus = (statusName, newStatus) => {
  logEmitter.emit("functionCall", "status.service", "setStatus");

  status[statusName] = newStatus;

  logEmitter.emit(
    "functionSuccessWith",
    "status.service",
    "setStatus",
    `Status "${statusName}" set to: ${status[statusName]}`
  );
  return status[statusName];
};

const incrementStatusCount = statusName => {
  logEmitter.emit("functionCall", "status.service", "setStatus");
  if (Number.isInteger(status[statusName])) {
    status[statusName]++;
    logEmitter.emit(
      "functionSuccessWith",
      "status.service",
      "incrementStatusCount",
      `Status "${statusName}" incremented. New value is: ${status[statusName]}`
    );
    return status[statusName];
  } else {
    const message = `Status name "${statusName}" is not an integer. Unable to increment.`;

    logEmitter.emit(
      "functionFail",
      "status.service",
      "incrementStatusCount",
      message
    );

    throw new Error(message);
  }
};

module.exports = { getStatus, setStatus, incrementStatusCount };
