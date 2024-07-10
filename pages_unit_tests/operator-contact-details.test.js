/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");
const { operatorTypeEnum } = require("@slice-and-dice/register-a-food-business-validation");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    registration_role: "PARTNERSHIP",
    operator_primary_number: "12345678978",
    operator_secondary_number: "999999999123",
    operator_email: "test123@123.com"
  },
  enums: {
    operatorType: operatorTypeEnum
  },
  council: "cardiff",
  language: "en"
};

const $ = renderPage("operator-contact-details", props);

describe("operator-contact-details", () => {
  it("It should pass accessibility tests", async () => {
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Partnership details");
  });

  it("renders correct inset text", () => {
    const $detailsText = getPageDetails.getDetailsText($);
    expect($detailsText).toEqual(
      "The operator is the person or people, charity or company who makes the decisions about the food business. They decide what it serves and how it operates."
    );
  });

  describe("It should have correct label together with input field and value", () => {
    it("renders operator contact details fields correctly", () => {
      const $primaryNumber = $("#operator_primary_number");
      expect($primaryNumber.get(0).attribs.name).toBe("operator_primary_number");
      expect($primaryNumber.get(0).attribs.value).toBe("12345678978");

      const $secondaryNumber = $("#operator_secondary_number");
      expect($secondaryNumber.get(0).attribs.name).toBe("operator_secondary_number");
      expect($secondaryNumber.get(0).attribs.value).toBe("999999999123");

      const $email = $("#operator_email");
      expect($email.get(0).attribs.name).toBe("operator_email");
      expect($email.get(0).attribs.value).toBe("test123@123.com");
    });

    it("renders operator contact detail labels correctly", () => {
      const $inputLabelTextMainNumber = getPageDetails.getInputLabelText($, 0);
      expect($inputLabelTextMainNumber).toEqual("Main phone number");

      const $inputLabelTextSecondaryNumber = getPageDetails.getInputLabelText($, 1);
      expect($inputLabelTextSecondaryNumber).toEqual("Secondary phone number (optional)");

      const $inputLabelTextEmail = getPageDetails.getInputLabelText($, 2);
      expect($inputLabelTextEmail).toEqual("Email address");
    });
  });

  describe("when registration role is not a partnership", () => {
    it("renders correct header", () => {
      const $ = renderPage("operator-contact-details", {
        language: "en",
        cumulativeFullAnswers: {
          registration_role: "Test"
        }
      });
      const $mainHeading = getPageDetails.getMainHeading($);
      expect($mainHeading.text().trim()).toEqual("Operator contact details");
    });
  });

  it("renders the correct errors", async () => {
    const $ = renderPage("operator-contact-details", {
      language: "en",
      validatorErrors: {
        operator_primary_number: "Enter a valid primary number",
        operator_email: "Enter a valid email"
      }
    });

    const $pageErrors = getPageDetails.getErrorSummaryLinks($);
    expect($pageErrors.length).toBe(2);
    expect($pageErrors.contents().get(0).data).toBe("Enter a valid primary number");
    expect($pageErrors.contents().get(1).data).toBe("Enter a valid email");
  });
});
