/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  transformedData: { establishment_address_line_1: "Example address line 1" },
  language: "en"
};

describe("registration-summary", () => {
  it("renders without crashing", () => {
    const $ = renderPage("registration-summary", props);
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Check your answers");
  });

  it("renders without crashing", () => {
    const $ = renderPage("registration-summary", props);
    const $AreaHeading = getPageDetails.getAreaHeading($);
    expect($AreaHeading[1].children[0].data).toEqual("Operator details");
  });

  it("renders without crashing", () => {
    const $ = renderPage("registration-summary", props);
    const $AreaHeading = getPageDetails.getAreaHeading($);
    expect($AreaHeading[2].children[0].data).toEqual("Establishment details");
  });

  it("renders without crashing", () => {
    const $ = renderPage("registration-summary", props);
    const $AreaHeading = getPageDetails.getAreaHeading($);
    expect($AreaHeading[3].children[0].data).toEqual("Activities");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("registration-summary", props);
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("gets given props", () => {
    const $ = renderPage("registration-summary", props);
    const $answer = $("#establishment_address_line_1");
    expect($answer.get(0).children[0].data.trim()).toBe(
      "Example address line 1"
    );
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("registration-summary", {
        language: "cy",
        allValidationErrors: {
          operator_companies_house_number: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
    });
  });
});
