import businessTypesJSON from "./business-type-transformed-en.json";
import stemmer from "stemmer";

const findMatches = (query, returnResultsArray) => {
  const businessTypesArray = Object.values(
    JSON.parse(JSON.stringify(businessTypesJSON))
  );

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
      // remove duplicate entries of the same displayName
      .filter(
        (obj, pos, arr) =>
          arr
            .map((mapObj) => mapObj["displayName"])
            .indexOf(obj["displayName"]) === pos
      )
      // check for matching words and beginnings of words
      .filter((entry) => checkForQueryMatch(entry.displayName, query))
      // remove the searchTerm field of each result
      .map((entry) => {
        return {
          displayName: entry.displayName,
          searchTerm: undefined
        };
      });

    searchTermMatchArray = businessTypesArray.filter((entry) =>
      // check for matching words and beginnings of words (including the displayName)
      checkForQueryMatch(entry.searchTerm, query)
    );

    resultsArray = displayNameMatchArray.concat(searchTermMatchArray);

    // sort the results alphabetically by displayName
    resultsArray.sort((a, b) => (a.displayName < b.displayName ? -1 : 1));
  } else {
    resultsArray = [];
  }

  returnResultsArray(resultsArray);
};

const suggestionFunction = (suggestionToBeDisplayed) => {
  return (
    suggestionToBeDisplayed.displayName +
    (suggestionToBeDisplayed.searchTerm
      ? ` <span class="searchTermResult">(${suggestionToBeDisplayed.searchTerm})</span>`
      : "")
  );
};

const inputValueFunction = (selectedSuggestion) =>
  selectedSuggestion
    ? selectedSuggestion.displayName +
      (selectedSuggestion.searchTerm
        ? " (" + selectedSuggestion.searchTerm + ")"
        : "")
    : undefined;

module.exports = { findMatches, inputValueFunction, suggestionFunction };
