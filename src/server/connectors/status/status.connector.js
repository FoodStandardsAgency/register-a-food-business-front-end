const getStoredStatus = async () => ({
  registrationsStarted: 0,
  submissionsSucceeded: 0,
  submissionsFailed: 0,
  addressLookupsSucceeded: 0,
  addressLookupsReturnedZero: 0,
  mostRecentSubmitSucceeded: true,
  mostRecentAddressLookupSucceeded: true
});

module.exports = { getStoredStatus };
