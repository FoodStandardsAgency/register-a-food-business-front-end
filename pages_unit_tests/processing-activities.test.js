/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");
const { processingActivitiesEnum } = require("@slice-and-dice/register-a-food-business-validation");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { processing_activities: "default" },
  language: "en"
};

describe("processing-activities", () => {
  it("renders without crashing", () => {
    const $ = renderPage("processing-activities", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "What food processing activities do you intend to carry out in your food business?"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("processing-activities", props);
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("checkboxes render", () => {
    it("renders", async () => {
      const $ = renderPage("processing-activities", props);
      const $checkboxes = $("input[type='checkbox']");
      expect($checkboxes.length).toBe(8);
    });

    it("gets given the correct default value", () => {
      const $ = renderPage("processing-activities", props);
      const $checkboxes = $("input[type='checkbox']");
      const firstCheckbox = $checkboxes.first();
      expect(firstCheckbox.val()).toBe(processingActivitiesEnum.VACUUM_PACKING.key);
    });

    describe("Error messages displayed", () => {
      it("renders the correct summary error", async () => {
        const $ = renderPage("processing-activities", {
          language: "cy",
          validatorErrors: {
            processing_activities: "test error"
          }
        });

        const $pageErrors = getPageDetails.getErrorSummaryLinks($);
        expect($pageErrors.length).toBe(1);
        expect($pageErrors.contents().get(0).data).toBe("test error");
      });

      it("renders the correct error", async () => {
        const $ = renderPage("processing-activities", {
          language: "en",
          validatorErrors: {
            processing_activities: "test error"
          }
        });

        const $inputError = $("#processing_activities-error");
        expect($inputError.length).toBe(1);
        expect($inputError.contents().get(2).data.trim()).toBe("test error");
      });
    });
  });
});
