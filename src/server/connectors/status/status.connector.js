const getStoredStatus = () => ({
  registrationsStarted: 0,
  submissionsSucceeded: 0,
  submissionsFailed: 0,
  addressLookups: 0,
  mostRecentSubmitSucceeded: true,
  mostRecentAddressLookupSucceeded: true
});

module.exports = { getStoredStatus };
