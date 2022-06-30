/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    operator_company_name: "Test",
    operator_companies_house_number: "12345678"
  },
  council: "cardiff",
  language: "en"
};

const $ = renderPage("operator-company-details", props);

describe("operator-company-details", () => {
  it("It should pass accessibility tests", async () => {
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Company details");
  });

  describe("It should have correct label together with input field and value", () => {
    it("renders operator company details fields correctly", () => {
      const $companyName = $("#operator_company_name");
      expect($companyName.get(0).attribs.name).toBe("operator_company_name");
      expect($companyName.get(0).attribs.value).toBe("Test");

      const $companiesHouseNumber = $("#operator_companies_house_number");
      expect($companiesHouseNumber.get(0).attribs.name).toBe(
        "operator_companies_house_number"
      );
      expect($companiesHouseNumber.get(0).attribs.value).toBe("12345678");
    });

    it("renders operator contact detail labels correctly", () => {
      const $inputLabelTextcompanyName = getPageDetails.getInputLabelText($, 0);
      expect($inputLabelTextcompanyName).toEqual("Registered company name");

      const $inputLabelTextcompaniesHouseNumber =
        getPageDetails.getInputLabelText($, 1);
      expect($inputLabelTextcompaniesHouseNumber).toEqual(
        "Companies House number"
      );
    });
  });

  it("renders the correct errors", async () => {
    const $ = renderPage("operator-company-details", {
      language: "en",
      validatorErrors: {
        operator_company_name: "Test",
        operator_companies_house_number: "Test1"
      }
    });

    const $pageErrors = getPageDetails.getErrorSummaryLinks($);
    expect($pageErrors.length).toBe(2);
    expect($pageErrors.contents().get(0).data).toBe("Test");
    expect($pageErrors.contents().get(1).data).toBe("Test1");
  });
});
