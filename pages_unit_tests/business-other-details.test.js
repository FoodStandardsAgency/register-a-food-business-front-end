/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { business_other_details: "default" },
  language: "en"
};

describe("business-other-details", () => {
  it("renders without crashing", () => {
    const $ = renderPage("business-other-details", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Other details");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("business-other-details", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("opening days irregular input field", () => {
    it("renders", async () => {
      const $ = renderPage("business-other-details", props);
      const $textArea = $("#business_other_details");
      expect($textArea.length).toBe(1);
    });

    it("gets given the correct default value", () => {
      const $ = renderPage("business-other-details", props);
      const $textArea = $("#business_other_details");
      expect($textArea.get(0).children[0].data).toBe("default");
    });

    describe("Error messages displayed", () => {
      it("renders the correct summary error", async () => {
        const $ = renderPage("business-other-details", {
          language: "cy",
          validatorErrors: {
            business_other_details: "test error"
          }
        });

        const $pageErrors = getPageDetails.getErrorSummaryLinks($);
        expect($pageErrors.length).toBe(1);
        expect($pageErrors.contents().get(0).data).toBe("test error");
      });

      it("renders the correct error", async () => {
        const $ = renderPage("business-other-details", {
          language: "cy",
          validatorErrors: {
            business_other_details: "test error"
          }
        });

        const $inputError = $("#business_other_details-error");
        expect($inputError.length).toBe(1);
        expect($inputError.contents().get(2).data.trim()).toBe("test error");
      });
    });
  });
});
