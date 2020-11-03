const fs = require("fs");
const fetch = require("node-fetch");

const updateBusinessTypesForAutocomplete = async () => {
  const businessTypesData = await fetch(
    "https://data.food.gov.uk/codes/business/rafb/establishment-type?_format=jsonld"
  );

  const businessTypesJSON = await businessTypesData.json();

  const newBusinessTypesArray = Object.values(
    JSON.parse(JSON.stringify(businessTypesJSON["@graph"]))
  );

  const businessTypesSearchData = await fetch(
    "https://raw.githubusercontent.com/FoodStandardsAgency/Future-Risk-Engine-Development/master/business-types.json"
  );

  const businessTypesSearchJSON = await businessTypesSearchData.json();

  const newBusinessTypesSearchDataArray = Object.values(
    JSON.parse(JSON.stringify(businessTypesSearchJSON))
  );

  const transformedBusinessTypeArray_en = [];
  const transformedBusinessTypeArray_cy = [];

  function getDisplayNames(rdfsLabel) {
    const displayNames = {};
    if (Array.isArray(rdfsLabel)) {
      rdfsLabel.forEach((label) => {
        displayNames[label["@language"]] = label["@value"];
      });
    } else {
      displayNames[rdfsLabel["@language"]] = rdfsLabel["@value"];
    }
    return displayNames;
  }

  newBusinessTypesSearchDataArray.forEach((businessTypeSearchData) => {
    newBusinessTypesArray.forEach((businessType) => {
      const displayNames = getDisplayNames(businessType["rdfs:label"]);
      if (
        businessType["skos:notation"] &&
        displayNames.en === businessTypeSearchData.displayName
      ) {
        businessTypeSearchData.searchTerms.forEach((searchTerm) => {
          const newArrayEntry_en = {
            id: businessType["skos:notation"],
            displayName: displayNames.en,
            searchTerm
          };
          transformedBusinessTypeArray_en.push(newArrayEntry_en);
          const newArrayEntry_cy = {
            id: businessType["skos:notation"],
            displayName: displayNames.cy || displayNames.en,
            searchTerm
          };
          transformedBusinessTypeArray_cy.push(newArrayEntry_cy);
        });
      }
    });
  });

  const en_filename = "./src/components/business-type-transformed-en.json";
  fs.writeFile(
    en_filename,
    JSON.stringify(transformedBusinessTypeArray_en),
    (err) => {
      if (err) {
        return console.log(err);
      }
      console.log(`SUCCESS: ${en_filename} updated.`);
    }
  );

  // const cy_filename = "./src/components/business-type-transformed-cy.json";
  // fs.writeFile(
  //   cy_filename,
  //   JSON.stringify(transformedBusinessTypeArray_cy),
  //   (err) => {
  //     if (err) {
  //       return console.log(err);
  //     }
  //     console.log(`SUCCESS: ${cy_filename} updated.`);
  //   }
  // );
};

updateBusinessTypesForAutocomplete();
