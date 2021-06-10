const {
  establishConnectionToCosmos,
  closeCosmosConnection
} = require("../src/server/connectors/cosmos.client");
const fetch = require("node-fetch");
const { logEmitter } = require("../src/server/services/logging.service");
const {
  transformAnswersForSubmit
} = require("../src/server/services/data-transform.service");
const sessionBackups = require("./sessionBackup.json");
const {
  API_SECRET,
  CLIENT_NAME,
  REGISTRATION_DATA_VERSION,
  SUBMIT_URL
} = require("../src/server/config");

/*Script to re-submit cached registrations that didn't save to the database, but are marked as submitted.
  Converts each sessions session string field to an object, filters those sessions that have submissionSucceeded:true 
  but no fsaRegistrationNumber field, transforms those sessions to the correct format for submission. Before sending
  the session in a request to the registration service it checks to ensure a registration with that trading name and 
  primary number is not already in the database*/

/* Re-submission request to the registration service, doesn't include session _id as there will be no session in 
  the dataabase for the registration service to update anymore.*/
const sendRequest = async (body) => {
  const headers = {
    "Content-Type": "application/json",
    "api-secret": API_SECRET,
    "client-name": CLIENT_NAME,
    "registration-data-version": REGISTRATION_DATA_VERSION
  };
  const res = await fetch(SUBMIT_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });

  return res.json();
};

// Filter sessions for those that were 'successfully. submitted but never saved to back-end cache.
const findFalseSuccessRegistrations = (sessionArray) => {
  let sessionsToSubmit = sessionArray.filter(
    (session) => session.submissionSucceeded && !session.fsaRegistrationNumber
  );
  return sessionsToSubmit;
};

// Tranform session field strings to objects.
const transformSessionStringsToObjects = (sessionArray) => {
  const sessionObjects = [];
  sessionArray.forEach((entry) =>
    sessionObjects.push(JSON.parse(entry.session))
  );
  return sessionObjects;
};

// Check registration trading name and establishment primary number to see if registration is already in database.
const checkIfRegistrationInDB = async (data, feCache) => {
  try {
    logEmitter.emit("info", "checkIfRegistrationInDB called");

    const foundRegistrations = await feCache
      .find({
        $and: [
          {
            "establishment.establishment_details.establishment_trading_name":
              data.registration.establishment.establishment_details
                .establishment_trading_name
          },
          {
            "establishment.establishment_details.establishment_primary_number":
              data.registration.establishment.establishment_details
                .establishment_primary_number
          }
        ]
      })
      .toArray();
    return foundRegistrations.length > 0 ? true : false;
  } catch (err) {
    logEmitter.emit("info", `Failed to check for registration in db: ${err}`);
  }
};

// Use front-end data-transform function to transform registration data into submission format.
const transformToSubmitObjects = (sessions) => {
  let submitObjects = [];
  sessions.forEach((session) =>
    submitObjects.push(
      transformAnswersForSubmit(
        session.cumulativeFullAnswers,
        session.language,
        session.addressLookups,
        session.council
      )
    )
  );

  return submitObjects;
};

const submitCachedRegistrations = async () => {
  try {
    let fsarns = [];
    let feCache = await establishConnectionToCosmos(
      "registrations",
      "registrations"
    );
    let fullSessionObjects = transformSessionStringsToObjects(sessionBackups);
    let filteredSessions = findFalseSuccessRegistrations(fullSessionObjects);
    let submitObjects = transformToSubmitObjects(filteredSessions);
    logEmitter.emit(
      "info",
      `${submitObjects.length} registrations to re-submit`
    );

    // // TESTING ONLY
    // submitObjects.forEach(
    //   // eslint-disable-next-line no-param-reassign
    //   (registration) => (registration.local_council_url = "fakes")
    // );

    const promises = submitObjects.map(async (data) => {
      if (await checkIfRegistrationInDB(data, feCache)) {
        logEmitter.emit(
          "info",
          `Registration with trading name: ${data.registration.establishment.establishment_details.establishment_trading_name} and establishment primary number ${data.registration.establishment.establishment_details.establishment_primary_number} already in database`
        );
      } else {
        logEmitter.emit(
          "info",
          `submitting to registration service - trading name: ${data.registration.establishment.establishment_details.establishment_trading_name}`
        );
        const res = await sendRequest(data);
        logEmitter.emit("info", `${JSON.stringify(res)}`);
        fsarns.push(res["fsa-rn"]);
      }
    });

    await Promise.allSettled(promises);

    logEmitter.emit(
      "info",
      `Registrations added to the database - ${fsarns.length}: ${fsarns}`
    );
  } catch (err) {
    logEmitter.emit("info", `Submit cached registrations failed - ${err}`);
  }
};

submitCachedRegistrations()
  .then(() => {
    closeCosmosConnection();
    logEmitter.emit(
      "info",
      "Successfully finished submit-cached-registrations script"
    );
  })
  .catch((err) => {
    closeCosmosConnection();
    logEmitter.emit(
      "info",
      `Failed to run submit-cached-registrations script - ${err}`
    );
  });
