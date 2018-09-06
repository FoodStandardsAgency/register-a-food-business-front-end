const status = {
  registrationsStarted: 0,
  submissions: 0
};

const getStatus = statusName => {
  if (statusName) {
    return status[statusName];
  } else {
    return status;
  }
};

const setStatus = (statusName, newStatus) => {
  status[statusName] = newStatus;
};

const incrementStatusCount = statusName => {
  if (Number.isInteger(status[statusName])) {
    status[statusName]++;
  } else {
    const message = `Status name "${
      status[statusName]
    }" is not an integer. Unable to increment.`;
    throw new Error(message);
  }
};

module.exports = { getStatus, setStatus, incrementStatusCount };
