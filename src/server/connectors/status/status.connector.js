const storedStatus = {
  registrationsStarted: 0,
  submissionsSucceeded: 0,
  submissionsFailed: 0,
  mostRecentSubmitSucceeded: true,
  addressLookupsSucceeded: 0,
  addressLookupsReturnedZero: 0,
  addressLookupsFailed: 0,
  mostRecentAddressLookupSucceeded: true
};

const getStoredStatus = async () => storedStatus;

const updateStoredStatus = async (statusName, newStatus) => {
  storedStatus[statusName] = newStatus;
  return storedStatus[statusName];
};

module.exports = { getStoredStatus, updateStoredStatus };
