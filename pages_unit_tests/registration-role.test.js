/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { registration_role: "PARTNERSHIP" },
  language: "en"
};

describe("registration-role", () => {
  it("renders without crashing", () => {
    const $ = renderPage("registration-role", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("What is your role in this food business?");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("registration-role", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders 3 radio buttons", async () => {
    const $ = renderPage("registration-role", props);

    const $registrationRoleRadios = getPageDetails.getRadioButtons($);
    expect($registrationRoleRadios.length).toBe(3);
  });

  describe("Radio boxes have correct value", () => {
    it("renders the Soletrader radio button with the correct value", () => {
      const $ = renderPage("registration-role", props);
      const $mainHeadingSoletrader = $("#registration_role_sole_trader");
      expect($mainHeadingSoletrader.get(0).attribs.value).toBe("SOLETRADER");
    });
    it("renders the Partnership radio button with the correct value", () => {
      const $ = renderPage("registration-role", props);
      const $mainHeadingPartnership = $("#registration_role_partnership");
      expect($mainHeadingPartnership.get(0).attribs.value).toBe("PARTNERSHIP");
    });
    it("renders the Representative radio button with the correct value", () => {
      const $ = renderPage("registration-role", props);
      const $mainHeadingRepresentative = $("#registration_role_representative");
      expect($mainHeadingRepresentative.get(0).attribs.value).toBe("Representative");
    });
    it("select the correct radio button based on session data", () => {
      const $ = renderPage("registration-role", props);
      const $selected = $("input:checked");
      expect($selected.get(0).attribs.value).toBe("PARTNERSHIP");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("registration-role", {
        language: "cy",
        validatorErrors: {
          registration_role: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
      expect($pageErrors.get(0).attribs.href).toBe("#registration_role");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("registration-role", {
        language: "cy",
        validatorErrors: {
          registration_role: "test error"
        }
      });

      const $radioError = $("#registration_role-error");
      expect($radioError.length).toBe(1);
      expect($radioError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});
