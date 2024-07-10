/**
 * @jest-environment jsdom
 */

const { operatorTypeEnum } = require("@slice-and-dice/register-a-food-business-validation");
const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { operator_type: "COMPANY" },
  enums: {
    operatorType: operatorTypeEnum
  },
  language: "en"
};

describe("operator-type", () => {
  it("renders without crashing", () => {
    const $ = renderPage("operator-type", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Who operates this business?");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("operator-type", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders 3 radio buttons", async () => {
    const $ = renderPage("operator-type", props);

    const $registrationRoleRadios = getPageDetails.getRadioButtons($);
    expect($registrationRoleRadios.length).toBe(3);
  });

  describe("Radio boxes have correct value", () => {
    it("renders the Person radio button with the correct value", () => {
      const $ = renderPage("operator-type", props);
      const $mainHeadingPerson = $("#operator_type_person");
      expect($mainHeadingPerson.get(0).attribs.value).toBe("PERSON");
    });
    it("renders the Company radio button with the correct value", () => {
      const $ = renderPage("operator-type", props);
      const $mainHeadingCompany = $("#operator_type_company");
      expect($mainHeadingCompany.get(0).attribs.value).toBe("COMPANY");
    });
    it("renders the Representative radio button with the correct value", () => {
      const $ = renderPage("operator-type", props);
      const $mainHeadingCharity = $("#operator_type_charity");
      expect($mainHeadingCharity.get(0).attribs.value).toBe("CHARITY");
    });
    it("select the correct radio button based on session data", () => {
      const $ = renderPage("operator-type", props);
      const $selected = $("input:checked");
      expect($selected.get(0).attribs.value).toBe("COMPANY");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("operator-type", {
        language: "cy",
        validatorErrors: {
          operator_type: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("operator-type", {
        language: "cy",
        validatorErrors: {
          operator_type: "test error"
        }
      });

      const $radioError = $("#operator_type-error");
      expect($radioError.length).toBe(1);
      expect($radioError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});
