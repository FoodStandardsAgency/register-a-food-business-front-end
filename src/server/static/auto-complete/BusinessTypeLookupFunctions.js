var stemmer = require('stem-porter');

var businessTypeEnum = require("@slice-and-dice/register-a-food-business-validation");

const businessTypeFunctions = {

 findMatches: function (query, returnResultsArray) {
  const businessTypesArray = Object.values(businessTypeEnum.businessTypeEnum);

  const checkForQueryMatch = (searchableText, query) => {
    const wordArray = searchableText
      .toLowerCase()
      .split(" ")
      .filter((word) => word !== "");

    const queryArray = query
      .toLowerCase()
      .split(" ")
      .filter((word) => word !== "");

    const matching = queryArray.some(
      (word) =>
        wordArray.findIndex((entry) => {
          return entry.startsWith(word) || entry.startsWith(stemmer(word));
        }) !== -1
    );

    return matching;
  };

  let displayNameMatchArray;
  let searchTermMatchArray;
  let resultsArray;

  if (query) {
    displayNameMatchArray = businessTypesArray
      // check for matching words and beginnings of words in the display value
      .filter((entry) => { 
        checkForQueryMatch(entry.value[window.language], query)})
      // remove the searchTerm field of each result
      .map((entry) => {
        return {
          value: entry.value[window.language],
          searchTerm: undefined
        };
      });

    searchTermMatchArray = businessTypesArray
      .filter((entry) =>
        // check for matching words and beginnings of words in the search terms
        entry.searchTerms[window.language].some((term) =>
          checkForQueryMatch(term, query)
        )
      )
      .map((entry) => {
        return {
          value: entry.value[window.language],
          searchTerm: entry.searchTerms[window.language].find((term) =>
            checkForQueryMatch(term, query)
          )
        };
      });

    resultsArray = displayNameMatchArray.concat(searchTermMatchArray);

    // sort the results alphabetically by displayName
    resultsArray.sort((a, b) => (a.value < b.value ? -1 : 1));
  } else {
    resultsArray = [];
  }

  returnResultsArray(resultsArray);
},

suggestionFunction: function(suggestionToBeDisplayed) {
  return (
    suggestionToBeDisplayed.value +
    (suggestionToBeDisplayed.searchTerm
      ? ` <span class="searchTermResult">(${suggestionToBeDisplayed.searchTerm})</span>`
      : "")
  );
},

inputValueFunction: function(selectedSuggestion) {
  return selectedSuggestion
    ? selectedSuggestion.value +
      (selectedSuggestion.searchTerm
        ? " (" + selectedSuggestion.searchTerm + ")"
        : "")
    : undefined
      }
  };

module.exports = {businessTypeFunctions};
