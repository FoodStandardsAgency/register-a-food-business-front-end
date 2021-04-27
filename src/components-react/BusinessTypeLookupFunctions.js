import { i18n } from "../../i18n";
import stemmer from "stemmer";
import { businessTypeEnum } from "@slice-and-dice/register-a-food-business-validation";

const findMatches = (query, returnResultsArray) => {
  const businessTypesArray = Object.values(businessTypeEnum);

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
      .filter((entry) => checkForQueryMatch(entry.value[i18n.language], query))
      // remove the searchTerm field of each result
      .map((entry) => {
        return {
          value: entry.value[i18n.language],
          searchTerm: undefined
        };
      });

    searchTermMatchArray = businessTypesArray
      .filter((entry) =>
        // check for matching words and beginnings of words in the search terms
        entry.searchTerms[i18n.language].some((term) =>
          checkForQueryMatch(term, query)
        )
      )
      .map((entry) => {
        return {
          value: entry.value[i18n.language],
          searchTerm: entry.searchTerms[i18n.language].find((term) =>
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
};

const suggestionFunction = (suggestionToBeDisplayed) => {
  return (
    suggestionToBeDisplayed.value +
    (suggestionToBeDisplayed.searchTerm
      ? ` <span class="searchTermResult">(${suggestionToBeDisplayed.searchTerm})</span>`
      : "")
  );
};

const inputValueFunction = (selectedSuggestion) =>
  selectedSuggestion
    ? selectedSuggestion.value +
      (selectedSuggestion.searchTerm
        ? " (" + selectedSuggestion.searchTerm + ")"
        : "")
    : undefined;

module.exports = { findMatches, inputValueFunction, suggestionFunction };
