/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { business_scale: "default" },
  language: "en"
};

describe("business-scale", () => {
  it("renders without crashing", () => {
    const $ = renderPage("business-scale", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Who do you intend to provide food to?");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("business-scale", props);
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("checkboxes render", () => {
    it("renders", async () => {
      const $ = renderPage("business-scale", props);
      const $checkboxes = $("input[type='checkbox']");
      expect($checkboxes.length).toBe(9);
    });

    it("gets given the correct default value", () => {
      const $ = renderPage("business-scale", props);
      const $checkboxes = $("input[type='checkbox']");
      const firstCheckbox = $checkboxes.first();
      expect(firstCheckbox.val()).toBe("LOCAL");
    });

    describe("Error messages displayed", () => {
      it("renders the correct summary error", async () => {
        const $ = renderPage("business-scale", {
          language: "cy",
          validatorErrors: {
            business_scale: "test error"
          }
        });

        const $pageErrors = getPageDetails.getErrorSummaryLinks($);
        expect($pageErrors.length).toBe(1);
        expect($pageErrors.contents().get(0).data).toBe("test error");
      });

      it("renders the correct error", async () => {
        const $ = renderPage("business-scale", {
          language: "en",
          validatorErrors: {
            business_scale: "Please select all options that apply to your business"
          }
        });

        const $inputError = $("#business_scale-error");
        expect($inputError.length).toBe(1);
        expect($inputError.contents().get(2).data.trim()).toBe("test error");
      });
    });
  });
});
