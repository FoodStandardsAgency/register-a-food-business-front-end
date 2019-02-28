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
  mostRecentGetPathConfigSucceeded: true,
  getLocalCouncilsSucceeded: 0,
  getLocalCouncilsFailed: 0,
  mostRecentGetLocalCouncilsSucceeded: true
};

const statusCollectionDouble = {
  findOne: query => {
    if (query._id === "frontEndStatus") {
      return storedStatus;
    } else {
      return null;
    }
  },
  updateOne: (query, update) => {
    if (query._id === "frontEndStatus") {
      return update;
    } else {
      return null;
    }
  }
};

module.exports = { statusCollectionDouble };
