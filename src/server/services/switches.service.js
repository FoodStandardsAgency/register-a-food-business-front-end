const { logEmitter } = require("./logging.service");

const changeSwitch = (action, currentSwitchState) => {
  logEmitter.emit("functionCall", "switches.service", "changeSwitch");

  try {
    if (
      currentSwitchState === true ||
      currentSwitchState === false ||
      currentSwitchState === undefined
    ) {
      if (action === "on") {
        logEmitter.emit(
          "functionSuccessWith",
          "switches.service",
          "changeSwitch",
          `New switch value: ${true}`
        );
        return true;
      } else if (action === "off") {
        logEmitter.emit(
          "functionSuccessWith",
          "switches.service",
          "changeSwitch",
          `New switch value: ${false}`
        );
        return false;
      } else if (action === "toggle") {
        logEmitter.emit(
          "functionSuccessWith",
          "switches.service",
          "changeSwitch",
          `New switch value: ${!currentSwitchState}`
        );
        return !currentSwitchState;
      } else
        throw new Error(`
            switches.service.js changeSwitch():
            The action "${action}" is not valid.
            `);
    } else
      throw new Error(`
      switches.service.js changeSwitch():
      The currentSwitchState "${currentSwitchState}" is not valid.
      `);
  } catch (err) {
    logEmitter.emit("functionFail", "switches.service", "changeSwitch", err);
    throw err;
  }
};

module.exports = { changeSwitch };
