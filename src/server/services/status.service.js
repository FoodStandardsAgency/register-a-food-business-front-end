/**
 * Functions for getting and setting status values
 * @module services/status
 */

const { logEmitter } = require("./logging.service");
const {
    getStoredStatus,
    updateStoredStatus
} = require("../connectors/status-db/status-db.connector");

/**
 * Gets the value of a specified status variable
 *
 * @param {string} statusName The name of the status variable to get
 *
 * @returns {any} The value of the status variable
 */
const getStatus = async (statusName) => {
    logEmitter.emit("functionCall", "status.service", "getStatus");

    let status;
    try {
        status = await getStoredStatus();
    } catch (err) {
        logEmitter.emit("functionFail", "status.service", "getStatus", err);
        return {};
    }

    if (statusName) {
        logEmitter.emit(
            "functionSuccessWith",
            "status.service",
            "getStatus",
            `Returning "${statusName}" status of "${status[statusName]}"`
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

/**
 * Sets a specified status variable to a new value
 *
 * @param {string} statusName The name of the status variable to set
 * @param {string} newStatus The new value
 *
 * @returns {any} The new value of the status variable
 */
const setStatus = async (statusName, newStatus) => {
    logEmitter.emit("functionCall", "status.service", "setStatus");

    try {
        const updatedStatusValue = await updateStoredStatus(
            statusName,
            newStatus
        );
        logEmitter.emit(
            "functionSuccessWith",
            "status.service",
            "setStatus",
            `Status "${statusName}" set to: ${updatedStatusValue}`
        );
        return updatedStatusValue;
    } catch (err) {
        logEmitter.emit("functionFail", "status.service", "setStatus", err);
    }
};

/**
 * Adds 1 to the existing value of a specified integer status
 *
 * @param {string} statusName The name of the status variable to increment
 *
 * @returns {number} The new value of the status variable
 */
const incrementStatusCount = async (statusName) => {
    logEmitter.emit("functionCall", "status.service", "incrementStatusCount");
    let status;
    try {
        status = await getStoredStatus();
    } catch (err) {
        logEmitter.emit(
            "functionFail",
            "status.service",
            "incrementStatusCount",
            err
        );
        return;
    }
    const currentValue = status[statusName];

    if (Number.isInteger(currentValue)) {
        const newValue = currentValue + 1;

        let updatedStatusValue;
        try {
            updatedStatusValue = await updateStoredStatus(statusName, newValue);
            logEmitter.emit(
                "functionSuccessWith",
                "status.service",
                "incrementStatusCount",
                `Status "${statusName}" incremented. New value is: ${updatedStatusValue}`
            );
            return updatedStatusValue;
        } catch (err) {
            logEmitter.emit(
                "functionFail",
                "status.service",
                "incrementStatusCount",
                err
            );
        }
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
