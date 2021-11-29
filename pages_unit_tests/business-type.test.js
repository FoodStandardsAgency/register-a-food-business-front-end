const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { businessTypeLookup: "Beekeeper (keeper)" },
  language: "en"
};

describe("business-type", () => {
  it("renders without crashing", () => {
    const $ = renderPage("business-type", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "What kind of food business are you registering?"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("business-type", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("picks up selection", async () => {
    const $ = renderPage("business-type", props);

    const $businessTypeDropdown = getPageDetails.getSelectionBox($);
    expect($businessTypeDropdown.length).toBe(1);
  });

  describe("Radio boxes have correct value", () => {
        it("renders the Soletrader radio button with the correct value", () => {
      const $ = renderPage("business-type", props);
      const $businessType = $("#business_type_beekeeper"); 
      expect($businessType.get(0).attribs.value).toBe("Beekeeper (keeper)");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("business-type", {
        language: "cy",
        validatorErrors: {
          business_type: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
      expect($pageErrors.get(0).attribs.href).toBe("#business_type");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("business-type", {
        language: "cy",
        validatorErrors: {
          business_type: "test error"
        }
      });

      const $radioError = $("#business_type-error");
      expect($radioError.length).toBe(1);
      expect($radioError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});