/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    establishment_opening_status: "Establishment is already trading"
  },
  language: "en"
};

describe("Establishment-Opening-Status", () => {
  it("renders without crashing", () => {
    const $ = renderPage("establishment-opening-status", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "Is this establishment already trading?"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("establishment-opening-status", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders 3 radio buttons", async () => {
    const $ = renderPage("establishment-opening-status", props);

    const $establishmentOpeningStatusRadios = getPageDetails.getRadioButtons($);
    expect($establishmentOpeningStatusRadios.length).toBe(2);
  });

  describe("Radio boxes have correct value", () => {
    it("renders the Establishment is already trading radio button with the correct value", () => {
      const $ = renderPage("establishment-opening-status", props);
      const $mainHeadingMobile = $(
        "#establishment_opening_status_already_trading"
      );
      expect($mainHeadingMobile.get(0).attribs.value).toBe(
        "Establishment is already trading"
      );
    });
    it("renders the Establishment due to trade radio button with the correct value", () => {
      const $ = renderPage("establishment-opening-status", props);
      const $mainHeadingDomestic = $(
        "#establishment_opening_status_not_trading"
      );
      expect($mainHeadingDomestic.get(0).attribs.value).toBe(
        "Establishment due to trade"
      );
    });
    it("select the correct radio button based on session data", () => {
      const $ = renderPage("establishment-opening-status", props);
      const $selected = $("input:checked");
      expect($selected.get(0).attribs.value).toBe(
        "Establishment is already trading"
      );
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("establishment-opening-status", {
        language: "cy",
        validatorErrors: {
          establishment_opening_status: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("establishment-opening-status", {
        language: "cy",
        validatorErrors: {
          establishment_opening_status: "test error"
        }
      });

      const $radioError = $("#establishment_opening_status-error");
      expect($radioError.length).toBe(1);
      expect($radioError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});
