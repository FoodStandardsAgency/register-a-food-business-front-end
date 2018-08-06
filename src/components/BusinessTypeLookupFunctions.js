import businessTypesJSON from "./business-type-transformed.json";

const suggest = (query, returnResultsArray) => {
  const businessTypesArray = Object.values(
    JSON.parse(JSON.stringify(businessTypesJSON))
  );

  const checkForQueryMatch = (displayName, query, searchTerm) => {
    const wordArray = displayName
      .toLowerCase()
      .split(" ")
      .filter(word => word !== "");

    if (searchTerm) {
      wordArray.concat(
        searchTerm
          .toLowerCase()
          .split(" ")
          .filter(word => word !== "")
      );
    }

    const queryArray = query
      .toLowerCase()
      .split(" ")
      .filter(word => word !== "");

    let matching = queryArray.some(
      word => wordArray.findIndex(entry => entry.startsWith(word)) !== -1
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
            .map(mapObj => mapObj["displayName"])
            .indexOf(obj["displayName"]) === pos
      )
      // check for matching words and beginnings of words
      .filter(entry => checkForQueryMatch(entry.displayName, query))
      // remove the searchTerm field of each result
      .map(entry => {
        return { displayName: entry.displayName, searchTerm: undefined };
      });

    searchTermMatchArray = businessTypesArray.filter(entry =>
      // check for matching words and beginnings of words (including the displayName)
      checkForQueryMatch(entry.searchTerm, query, entry.displayName)
    );

    resultsArray = displayNameMatchArray.concat(searchTermMatchArray);
  } else {
    resultsArray = [];
  }

  returnResultsArray(resultsArray);
};

const suggestionFunction = suggestionToBeDisplayed => {
  return (
    suggestionToBeDisplayed.displayName +
    (suggestionToBeDisplayed.searchTerm
      ? ` <span style="color: #6f777b">(${
          suggestionToBeDisplayed.searchTerm
        })</span>`
      : "")
  );
};

const inputValueFunction = selectedSuggestion =>
  selectedSuggestion
    ? selectedSuggestion.displayName +
      (selectedSuggestion.searchTerm
        ? " (" + selectedSuggestion.searchTerm + ")"
        : "")
    : undefined;

module.exports = { inputValueFunction, suggestionFunction, suggest };
