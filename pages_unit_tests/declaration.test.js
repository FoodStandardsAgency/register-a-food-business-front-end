/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const cumulativeFullAnswers = {
  declaration_1: "default"
};

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: cumulativeFullAnswers,
  language: "en"
};

describe("declaration", () => {
  it("renders without crashing", () => {
    const $ = renderPage("declaration", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Declaration");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("declaration", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("renders 7 checkboxes with correct error props and default values", () => {
    it("renders 4 checkboxes", () => {
      const $ = renderPage("declaration", props);

      const checkboxList = getPageDetails.getCheckboxes($);
      expect(checkboxList.length).toBe(4);
    });

    it("Declaration 1 checkbox gets given the correct default value", () => {
      const $ = renderPage("declaration", props);

      const $declarationOneCheckBox = $("#declaration_1");
      expect($declarationOneCheckBox.get(0).attribs.value).toBe(
        "I declare that the information I have given on this form is correct and complete to the best of my knowledge and belief."
      );
    });

    it("Declaration 2 checkbox gets given the correct default value", () => {
      const $ = renderPage("declaration", {
        language: "cy",
        cumulativeFullAnswers: {
          declaration_2: "default"
        }
      });

      const $declarationTwoCheckBox = $("#declaration_2");
      expect($declarationTwoCheckBox.get(0).attribs.value).toBe(
        "The operator will notify their local council of any significant changes to the business activity, including closure, within 28 days of the change happening."
      );
    });

    it("Declaration 3 checkbox gets given the correct default value", () => {
      const $ = renderPage("declaration", {
        language: "cy",
        cumulativeFullAnswers: {
          declaration_3: "default"
        }
      });

      const $declarationThreeCheckBox = $("#declaration_3");
      expect($declarationThreeCheckBox.get(0).attribs.value).toBe(
        "The operator understands they are legally responsible for the safety and authenticity of the food being produced or served at this establishment."
      );
    });

    it("Thursday checkbox gets given the correct default value", () => {
      const $ = renderPage("declaration", {
        language: "cy",
        cumulativeFullAnswers: {
          feedback_1: "default"
        }
      });

      const $feedbackOneCheckBox = $("#feedback_1");
      expect($feedbackOneCheckBox.get(0).attribs.value).toBe(
        "I agree to be contacted to provide feedback to help develop this service"
      );
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("declaration", {
        language: "cy",
        validatorErrors: {
          declaration1: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("declaration", {
        language: "cy",
        validatorErrors: {
          declaration1: "test error"
        }
      });

      const $checkboxError = $("#declaration-error");
      expect($checkboxError.length).toBe(1);
      expect($checkboxError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});
