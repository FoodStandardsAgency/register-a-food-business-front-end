/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    establishment_trading_name: "default",
    establishment_additional_trading_names: ["one", "two"]
  },
  language: "en"
};

describe("Establishment-Trading-Name", () => {
  it("renders without crashing", () => {
    const $ = renderPage("establishment-trading-name", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Trading name");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("establishment-trading-name", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("additional-trading-names", () => {
    it("renders additional trading names details fields correctly", () => {
      const $ = renderPage("establishment-trading-name", props);
      const $tradingName1 = $("#tradingName0");
      expect($tradingName1.text()).toBe("one");
      const $tradingName2 = $("#tradingName1");
      expect($tradingName2.text()).toBe("two");
    });
  });

  describe("establishment trading name input field", () => {
    it("renders", async () => {
      const $ = renderPage("establishment-trading-name", props);
      const $inputBox = $("#establishment_trading_name");
      expect($inputBox.length).toBe(1);
    });

    it("gets given the correct default value", () => {
      const $ = renderPage("establishment-trading-name", props);

      const $inputBox = $("#establishment_trading_name");
      expect($inputBox.get(0).attribs.value).toBe("default");
    });

    describe("Error messages displayed", () => {
      it("renders the correct summary error", async () => {
        const $ = renderPage("establishment-trading-name", {
          language: "cy",
          validatorErrors: {
            establishment_trading_name: "test error"
          }
        });

        const $pageErrors = getPageDetails.getErrorSummaryLinks($);
        expect($pageErrors.length).toBe(1);
        expect($pageErrors.contents().get(0).data).toBe("test error");
      });

      it("renders the correct error", async () => {
        const $ = renderPage("establishment-trading-name", {
          language: "cy",
          validatorErrors: {
            establishment_trading_name: "test error"
          }
        });

        const $inputError = $("#establishment_trading_name-error");
        expect($inputError.length).toBe(1);
        expect($inputError.contents().get(2).data.trim()).toBe("test error");
      });
    });
  });
});
