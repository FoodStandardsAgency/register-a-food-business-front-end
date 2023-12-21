/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const cumulativeFullAnswers = {
  operator_primary_number: "operator primary number",
  establishment_primary_number: "establishment primary number",
  registration_role: "PARTNERSHIP"
};

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: cumulativeFullAnswers,
  language: "en"
};

describe("Establishment-Contact-Details", () => {
  it("renders without crashing", () => {
    const $ = renderPage("establishment-contact-details", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Establishment contact details");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("establishment-contact-details", props);

    // Suppress empty table header rule as second column needs no heading
    const results = await axe($.html(), {
      rules: {
        "empty-table-header": { enabled: false }
      }
    });

    expect(results).toHaveNoViolations();
  });

  describe("establishment primary phone number input field", () => {
    it("renders", () => {
      const $ = renderPage("establishment-contact-details", props);

      const $establishmentPrimaryContact = $("#establishment_primary_number");
      expect($establishmentPrimaryContact.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const $ = renderPage("establishment-contact-details", {
        language: "cy",
        validatorErrors: {
          establishment_primary_number: "test error"
        }
      });

      const $establishmentPrimaryContactError = $("#establishment_primary_number-error");
      expect($establishmentPrimaryContactError.length).toBe(1);
      expect($establishmentPrimaryContactError.contents().get(2).data.trim()).toBe("test error");
    });

    it("gets given the correct default value when reuseOperatorContactDetails switch is true ", () => {
      const $ = renderPage("establishment-contact-details", {
        language: "cy",
        validatorErrors: {
          establishment_primary_number: "test error"
        },
        switches: {
          reuseOperatorContactDetails: true
        },
        cumulativeFullAnswers: {
          operator_primary_number: "operator primary number",
          establishment_primary_number: "establishment primary number",
          registration_role: "PARTNERSHIP"
        }
      });

      const $establishmentPrimaryContactInput = $("#establishment_primary_number");
      expect($establishmentPrimaryContactInput.get(0).attribs.value).toBe(
        "operator primary number"
      );
    });

    it("gets given the correct default value reuseOperatorContactDetails switch is false", () => {
      const $ = renderPage("establishment-contact-details", {
        language: "cy",
        validatorErrors: {
          establishment_primary_number: "test error"
        },
        switches: {
          reuseOperatorContactDetails: false
        },
        cumulativeFullAnswers: {
          operator_primary_number: "operator primary number",
          establishment_primary_number: "establishment primary number",
          registration_role: "PARTNERSHIP"
        }
      });

      const $establishmentPrimaryContactInput = $("#establishment_primary_number");
      expect($establishmentPrimaryContactInput.get(0).attribs.value).toBe(
        "establishment primary number"
      );
    });
  });

  describe("establishment secondary contact details input field", () => {
    it("renders", () => {
      const $ = renderPage("establishment-contact-details", props);

      const $establishmentSecondaryContact = $("#establishment_secondary_number");
      expect($establishmentSecondaryContact.length).toBe(1);
    });

    it("gets given the correct default value when reuseOperatorContactDetails switch is true ", () => {
      const $ = renderPage("establishment-contact-details", {
        language: "cy",
        validatorErrors: {
          establishment_secondary_number: "test error"
        },
        switches: {
          reuseOperatorContactDetails: true
        },
        cumulativeFullAnswers: {
          operator_secondary_number: "operator secondary number",
          establishment_secondary_number: "establishment 7secondary number",
          registration_role: "PARTNERSHIP"
        }
      });

      const $establishmentSecondaryContactInput = $("#establishment_secondary_number");
      expect($establishmentSecondaryContactInput.get(0).attribs.value).toBe(
        "operator secondary number"
      );
    });

    it("gets given the correct default value reuseOperatorContactDetails switch is false", () => {
      const $ = renderPage("establishment-contact-details", {
        language: "cy",
        validatorErrors: {
          establishment_secondary_number: "test error"
        },
        switches: {
          reuseOperatorContactDetails: false
        },
        cumulativeFullAnswers: {
          operator_secondary_number: "operator secondary number",
          establishment_secondary_number: "establishment secondary number",
          registration_role: "PARTNERSHIP"
        }
      });

      const $establishmentSecondaryContactInput = $("#establishment_secondary_number");
      expect($establishmentSecondaryContactInput.get(0).attribs.value).toBe(
        "establishment secondary number"
      );
    });
  });

  describe("establishment email input field", () => {
    it("renders", () => {
      const $ = renderPage("establishment-contact-details", props);

      const $establishmentEmail = $("#establishment_email");
      expect($establishmentEmail.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const $ = renderPage("establishment-contact-details", {
        language: "cy",
        validatorErrors: {
          establishment_email: "test error"
        }
      });

      const $establishmentEmailError = $("#establishment_email-error");
      expect($establishmentEmailError.length).toBe(1);
      expect($establishmentEmailError.contents().get(2).data.trim()).toBe("test error");
    });

    it("gets given the correct default value when reuseOperatorContactDetails switch is true ", () => {
      const $ = renderPage("establishment-contact-details", {
        language: "cy",
        validatorErrors: {
          establishment_email: "test error"
        },
        switches: {
          reuseOperatorContactDetails: true
        },
        cumulativeFullAnswers: {
          establishment_email: "establishment email",
          operator_email: "operator email",
          registration_role: "PARTNERSHIP"
        }
      });

      const $establishmentEmailInput = $("#establishment_email");
      expect($establishmentEmailInput.get(0).attribs.value).toBe("operator email");
    });

    it("gets given the correct default value reuseOperatorContactDetails switch is false", () => {
      const $ = renderPage("establishment-contact-details", {
        language: "cy",
        validatorErrors: {
          establishment_email: "test error"
        },
        switches: {
          reuseOperatorContactDetails: false
        },
        cumulativeFullAnswers: {
          establishment_email: "establishment email",
          operator_email: "operator email",
          registration_role: "PARTNERSHIP"
        }
      });

      const $establishmentEmailInput = $("#establishment_email");
      expect($establishmentEmailInput.get(0).attribs.value).toBe("establishment email");
    });
  });

  describe("establishment web address input field", () => {
    it("renders", () => {
      const $ = renderPage("establishment-contact-details", props);

      const $establishmentEmail = $("#establishment_web_address");
      expect($establishmentEmail.length).toBe(1);
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("establishment-contact-details", {
        language: "cy",
        validatorErrors: {
          establishment_primary_number: "test error",
          establishment_email: "test error 2"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(2);
      expect($pageErrors.contents().get(0).data).toBe("test error");
      expect($pageErrors.contents().get(1).data).toBe("test error 2");
    });
  });
});
