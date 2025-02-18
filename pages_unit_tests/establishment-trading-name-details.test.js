/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const propsWithTwoAdditionalTradinNamesArray = {
  validatorErrors: {},
  cumulativeFullAnswers: { establishment_additional_trading_names: ["one", "two"] },
  language: "en"
};

describe("establishment-trading-name-details", () => {
  it("renders without crashing", () => {
    const $ = renderPage(
      "establishment-trading-name-details",
      propsWithTwoAdditionalTradinNamesArray
    );

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Add additional trading name");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage(
      "establishment-trading-name-details",
      propsWithTwoAdditionalTradinNamesArray
    );

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("It should have correct label together with input field and value", () => {
    const $ = renderPage(
      "establishment-trading-name-details",
      propsWithTwoAdditionalTradinNamesArray
    );
    it("renders trading name details fields correctly", () => {
      const $tradingName = $("#trading_name");
      expect($tradingName.get(0).attribs.name).toBe("trading_name");
    });

    it("renders trading-name hint labels correctly", () => {
      const $inputLabelTextTradingName = $("#trading_name-hint");
      expect($inputLabelTextTradingName.get(0).children[0].data.trim()).toEqual("Trading name");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("establishment-trading-name-details", {
        language: "cy",
        validatorErrors: {
          trading_name: "test error"
        },
        cumulativeFullAnswers: { establishment_additional_trading_names: ["one", "two"] }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("establishment-trading-name-details", {
        language: "cy",
        validatorErrors: {
          trading_name: "test error"
        },
        cumulativeFullAnswers: { establishment_additional_trading_names: ["one", "two"] }
      });

      const $insertError = $("#trading_name-error");
      expect($insertError.length).toBe(1);
      expect($insertError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});
