/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { opening_days_start: "Irregular days" },
  language: "en"
};

describe("opening-days-start", () => {
  it("renders without crashing", () => {
    const $ = renderPage("opening-days-start", props);
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "What days will this establishment be open and producing or serving food?"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("opening-days-start", props);
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders 3 radio buttons", async () => {
    const $ = renderPage("opening-days-start", props);
    const $opening_days_startRadios = getPageDetails.getRadioButtons($);
    expect($opening_days_startRadios.length).toBe(3);
  });

  describe("Radio boxes have correct value", () => {
    it("renders the Every day radio button with the correct value", () => {
      const $ = renderPage("opening-days-start", props);
      const $mainHeadingMobile = $("#opening_days_start_everyday");
      expect($mainHeadingMobile.get(0).attribs.value).toBe("Every day");
    });

    it("renders the Some days radio button with the correct value", () => {
      const $ = renderPage("opening-days-start", props);
      const $mainHeadingDomestic = $("#opening_days_start_some_days");
      expect($mainHeadingDomestic.get(0).attribs.value).toBe("Some days");
    });
    it("renders the Irregular days radio button with the correct value", () => {
      const $ = renderPage("opening-days-start", props);
      const $mainHeadingCommercial = $("#opening_days_start_irregular_days");
      expect($mainHeadingCommercial.get(0).attribs.value).toBe(
        "Irregular days"
      );
    });
    it("select the Irregular days radio button based on session data", () => {
      const $ = renderPage("opening-days-start", props);
      const $selected = $("input:checked");
      expect($selected.get(0).attribs.value).toBe("Irregular days");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("opening-days-start", {
        language: "cy",
        validatorErrors: {
          opening_days_start: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("opening-days-start", {
        language: "cy",
        validatorErrors: {
          opening_days_start: "test error"
        }
      });

      const $radioError = $("#opening_days_start-error");
      expect($radioError.length).toBe(1);
      expect($radioError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});
