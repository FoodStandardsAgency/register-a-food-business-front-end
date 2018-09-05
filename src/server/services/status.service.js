const EventEmitter = require("events");

const status = {
  registrationsStarted: 0,
  submissions: 0
};

class StatusUpdate extends EventEmitter {}

const statusEmitter = new StatusUpdate();

statusEmitter.on("incrementCount", counterName => {
  status[counterName]++;
});

const getStatus = statusName => {
  if (statusName) {
    return status[statusName];
  } else {
    return status;
  }
};

module.exports = { statusEmitter, getStatus };
