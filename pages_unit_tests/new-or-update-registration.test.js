/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { new_or_update_registration: "UPDATE_REGISTRATION" },
  language: "en"
};

describe("new-or-update-registration", () => {
  it("renders without crashing", () => {
    const $ = renderPage("new-or-update-registration", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("What do you want to do today?");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("new-or-update-registration", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders 2 radio buttons", async () => {
    const $ = renderPage("new-or-update-registration", props);

    const $newOrUpdateRegistrationRadios = getPageDetails.getRadioButtons($);
    expect($newOrUpdateRegistrationRadios.length).toBe(2);
  });

  describe("Radio boxes have correct value", () => {
    it("renders the newReg radio button with the correct value", () => {
      const $ = renderPage("new-or-update-registration", props);
      const $mainHeadingnewOrUpdateReg = $("#new_registration");
      expect($mainHeadingnewOrUpdateReg.get(0).attribs.value).toBe("NEW_REGISTRATION");
    });
    it("renders the updateReg radio button with the correct value", () => {
      const $ = renderPage("new-or-update-registration", props);
      const $mainHeadingnewOrUpdateReg = $("#update_registration");
      expect($mainHeadingnewOrUpdateReg.get(0).attribs.value).toBe("UPDATE_REGISTRATION");
    });
    it("select the correct radio button based on session data", () => {
      const $ = renderPage("new-or-update-registration", props);
      const $selected = $("input:checked");
      expect($selected.get(0).attribs.value).toBe("UPDATE_REGISTRATION");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("new-or-update-registration", {
        language: "cy",
        validatorErrors: {
          new_or_update_registration: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
      expect($pageErrors.get(0).attribs.href).toBe("#new_or_update_registration");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("new-or-update-registration", {
        language: "cy",
        validatorErrors: {
          new_or_update_registration: "test error"
        }
      });

      const $radioError = $("#new_or_update_registration-error");
      expect($radioError.length).toBe(1);
      expect($radioError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});
