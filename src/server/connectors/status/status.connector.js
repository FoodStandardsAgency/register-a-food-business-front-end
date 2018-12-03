/**
 * Updates and stores status variables
 * @module connectors/status
 */

const storedStatus = {
  registrationsStarted: 0,
  submissionsSucceeded: 0,
  submissionsFailed: 0,
  mostRecentSubmitSucceeded: true,
  addressLookupsSucceeded: 0,
  addressLookupsReturnedZero: 0,
  addressLookupsFailed: 0,
  mostRecentAddressLookupSucceeded: true,
  getPathConfigSucceeded: 0,
  getPathConfigFailed: 0,
  mostRecentGetPathConfigSucceeded: true
};

/**
 * Fetches all available status values
 * *
 * @returns {object} All status values
 */
const getStoredStatus = async () => storedStatus;

/**
 * Updates a specified status value
 *
 * @param {string} statusName The status field name
 * @param {any} newStatus The new status value
 *
 * @returns {any} The new status value
 */
const updateStoredStatus = async (statusName, newStatus) => {
  storedStatus[statusName] = newStatus;
  return storedStatus[statusName];
};

module.exports = { getStoredStatus, updateStoredStatus };
