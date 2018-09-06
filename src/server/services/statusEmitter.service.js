const { setStatus, incrementStatusCount } = require("./status.service");
const EventEmitter = require("events");

class StatusUpdate extends EventEmitter {}

const statusEmitter = new StatusUpdate();

statusEmitter.on("incrementCount", counterName => {
  incrementStatusCount(counterName);
});

statusEmitter.on("setStatus", (counterName, newStatus) => {
  setStatus(counterName, newStatus);
});

module.exports = { statusEmitter };
