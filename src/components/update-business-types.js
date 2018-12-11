const fs = require("fs");
const fetch = require("node-fetch");

const updateBusinessTypesForAutocomplete = async () => {
  const businessTypesData = await fetch(
    "https://raw.githubusercontent.com/Nathan-Philippo/risk-engine-rules/master/business-types.json"
  );

  const businessTypesJSON = await businessTypesData.json();

  const newBusinessTypesArray = Object.values(
    JSON.parse(JSON.stringify(businessTypesJSON))
  );

  const transformedBusinessTypeArray = [];

  newBusinessTypesArray.forEach(businessType => {
    businessType.searchTerms.forEach(searchTerm => {
      const newArrayEntry = {
        displayName: businessType.displayName,
        searchTerm
      };
      transformedBusinessTypeArray.push(newArrayEntry);
    });
  });

  fs.writeFile(
    "./src/components/business-type-transformed.json",
    JSON.stringify(transformedBusinessTypeArray),
    err => {
      if (err) {
        return console.log(err);
      }
      console.log(
        "SUCCESS: ./src/components/business-type-transformed.json updated."
      );
    }
  );
};

updateBusinessTypesForAutocomplete();
