/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { business_type: "Vending machine (sweets)" },
  language: "en"
};

describe("business-type", () => {
  it("renders without crashing", () => {
    const $ = renderPage("business-type", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "What kind of food business are you registering?"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("business-type", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("business-type", {
        language: "cy",
        validatorErrors: {
          business_type: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
      expect($pageErrors.get(0).attribs.href).toBe("#business_type");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("business-type", {
        language: "cy",
        validatorErrors: {
          business_type: "test error"
        }
      });

      const $inputError = $("#business_type-error");
      expect($inputError.length).toBe(1);
      expect($inputError.contents()[0].data.trim()).toBe("test error");
    });
  });
});
