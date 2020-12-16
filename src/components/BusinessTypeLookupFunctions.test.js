import stemmer from "stemmer";

import {
  inputValueFunction,
  suggestionFunction,
  findMatches
} from "./BusinessTypeLookupFunctions";

jest.mock("stemmer");
jest.mock("../../i18n", () => {
  return { i18n: { language: "en" } };
});
jest.mock("@slice-and-dice/register-a-food-business-validation", () => {
  return {
    businessTypeEnum: [
      {
        key: "001",
        value: { en: "Restaurant, cafe, canteen, or fast food restaurant" },
        searchTerms: { en: ["fusion"] }
      },
      {
        key: "002",
        value: { en: "Livestock farm" },
        searchTerms: { en: ["cow"] }
      },
      {
        key: "003",
        value: { en: "Take away with no food consumed on site" },
        searchTerms: { en: ["fusion"] }
      },
      {
        key: "004",
        value: { en: "Online retailer" },
        searchTerms: { en: ["computer", "example"] }
      },
      {
        key: "005",
        value: { en: "Butcher" },
        searchTerms: { en: ["retail"] }
      }
    ]
  };
});

describe("Function: inputValueFunction", () => {
  describe("Given that selectedSuggestion exists", () => {
    const selectedSuggestion = { value: "Food" };
    it("returns the value of displayName", () => {
      expect(inputValueFunction(selectedSuggestion)).toBe("Food");
    });
  });

  describe("Given that selectedSuggestion exists and a searchTerm is provided", () => {
    const selectedSuggestion = {
      value: "Food",
      searchTerm: "eating"
    };
    it("returns the value of displayName and searchTerm in brackets", () => {
      expect(inputValueFunction(selectedSuggestion)).toBe("Food (eating)");
    });
  });
});

describe("Given that selectedSuggestion doesn't exist", () => {
  const selectedSuggestion = undefined;
  it("returns undefined", () => {});
  expect(inputValueFunction(selectedSuggestion)).toBe(undefined);
});

describe("Function: suggestionFunction", () => {
  describe("Given that selectedSuggestion.searchTerm exists", () => {
    const selectedSuggestion = { value: "Food", searchTerm: "Diner" };
    it("returns the value of displayName + searchTerm", () => {
      expect(suggestionFunction(selectedSuggestion).includes("Food")).toBe(
        true
      );
      expect(suggestionFunction(selectedSuggestion).includes("Diner")).toBe(
        true
      );
    });
  });

  describe("Given that selectedSuggestion.searchTerm doesn't exist", () => {
    const selectedSuggestion = {
      value: "Food",
      searchTerm: undefined
    };
    it("returns the value of displayName", () => {
      expect(suggestionFunction(selectedSuggestion)).toEqual("Food");
    });
  });
});

let returnResultsArray;

describe("Function: findMatches", () => {
  beforeEach(() => {
    stemmer.mockImplementation((word) => word);
    //i18n.language.mockImplementation(() => "en");
    returnResultsArray = jest.fn();
  });

  describe("Given that query exists", () => {
    describe("query of 'cow'", () => {
      it("should call the return function with one entry - Livestock farm - with the searchTerm", () => {
        findMatches("cow", returnResultsArray);
        expect(returnResultsArray).toHaveBeenLastCalledWith([
          {
            value: "Livestock farm",
            searchTerm: "cow"
          }
        ]);
      });
    });

    describe("query of 'cows'", () => {
      it("should call the return function with one entry - Livestock farm - with the searchTerm still as cow", () => {
        stemmer.mockImplementation((word) => (word === "cows" ? "cow" : word));

        findMatches("cows", returnResultsArray);
        expect(returnResultsArray).toHaveBeenLastCalledWith([
          {
            value: "Livestock farm",
            searchTerm: "cow"
          }
        ]);
      });
    });

    describe("query of 'fusion'", () => {
      it("should call the return function with two entries - Restaurant and Takeaway", () => {
        findMatches("fusion", returnResultsArray);
        expect(returnResultsArray).toHaveBeenLastCalledWith([
          {
            value: "Restaurant, cafe, canteen, or fast food restaurant",
            searchTerm: "fusion"
          },
          {
            value: "Take away with no food consumed on site",
            searchTerm: "fusion"
          }
        ]);
      });
    });

    describe("query of 'retailer'", () => {
      it("should call the return function with two entries - Online retailer (searchTerm removed) and Butcher (retail)", () => {
        stemmer.mockImplementation((word) =>
          word === "retailer" ? "retail" : word
        );

        findMatches("retailer", returnResultsArray);
        expect(returnResultsArray).toHaveBeenLastCalledWith([
          {
            value: "Butcher",
            searchTerm: "retail"
          },
          {
            value: "Online retailer",
            searchTerm: undefined
          }
        ]);
      });
    });
  });

  describe("Given that query does not exist", () => {
    it("calls the return function with an empty array", () => {
      findMatches("", returnResultsArray);
      expect(returnResultsArray).toHaveBeenLastCalledWith([]);

      findMatches(undefined, returnResultsArray);
      expect(returnResultsArray).toHaveBeenLastCalledWith([]);
    });
  });
});
