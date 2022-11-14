const regularIntegrationResponse = require("./regularIntegrationResponse.json");

const addressLookupDouble = (postcode, query) => {
  if (postcode === "BS249ST") {
    return { data: regularIntegrationResponse, status: 200 };
  } else if (postcode === "AA111AA") {
    return { data: [], status: 200 };
    // TODO JMB - double for long responses. Requires testing.
    // } else if(postcode === "ADD > 100 ADDRESS POSTCODE HERE") {
    //   if(query === "?format=json&lines=4") {
    //     return "ADD FULL LENGTH RESPONSE HERE"
    //   }
    //   else if(query === "?format=json&lines=4&page=2") {
    //     return "ADD PAGE 2 OF FULL LENGTH RESPONSE HERE"
    //   }
    //   else return {status: 500};
  } else return { status: 500 };
};

module.exports = { addressLookupDouble };
