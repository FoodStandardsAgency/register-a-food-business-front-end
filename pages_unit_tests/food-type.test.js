/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");
const { foodTypeEnum } = require("@slice-and-dice/register-a-food-business-validation");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { food_type: "default" },
  enums: {
    foodType: foodTypeEnum
  },
  language: "en"
};

describe("food-type", () => {
  it("renders without crashing", () => {
    const $ = renderPage("food-type", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("What type of food do you intend to handle?");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("food-type", props);
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("checkboxes render", () => {
    it("renders", async () => {
      const $ = renderPage("food-type", props);
      const $checkboxes = $("input[type='checkbox']");
      expect($checkboxes.length).toBe(6);
    });

    it("gets given the correct default value", () => {
      const $ = renderPage("food-type", props);
      const $checkboxes = $("input[type='checkbox']");
      const firstCheckbox = $checkboxes.first();
      expect(firstCheckbox.val()).toBe(foodTypeEnum.RAW_MEAT_FISH_SHELLFISH.key);
    });

    describe("Error messages displayed", () => {
      it("renders the correct summary error", async () => {
        const $ = renderPage("food-type", {
          language: "cy",
          validatorErrors: {
            food_type: "test error"
          }
        });

        const $pageErrors = getPageDetails.getErrorSummaryLinks($);
        expect($pageErrors.length).toBe(1);
        expect($pageErrors.contents().get(0).data).toBe("test error");
      });

      it("renders the correct error", async () => {
        const $ = renderPage("food-type", {
          language: "en",
          validatorErrors: {
            food_type: "Please select all options that apply to your business"
          }
        });

        const $inputError = $("#food_type-error");
        expect($inputError.length).toBe(1);
        expect($inputError.contents().get(2).data.trim()).toBe(
          "Please select all options that apply to your business"
        );
      });
    });
  });
});
