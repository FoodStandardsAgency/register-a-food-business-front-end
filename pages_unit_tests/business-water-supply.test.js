const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { water_supply: "PRIVATE" },
  language: "en"
};

describe("business-water-supply", () => {
  it("renders without crashing", () => {
    const $ = renderPage("business-water-supply", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "What type of water supply does this establishment use?"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("business-water-supply", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders 3 radio buttons", async () => {
    const $ = renderPage("business-water-supply", props);

    const $watersupplyRadios = getPageDetails.getRadioButtons($);
    expect($watersupplyRadios.length).toBe(3);
  });

  describe("Radio boxes have correct value", () => {
    it("renders the Soletrader radio button with the correct value", () => {
      const $ = renderPage("business-water-supply", props);
      const $radioPublic = $("#water_supply_public"); 
      expect($radioPublic.get(0).attribs.value).toBe("PUBLIC");
    });
    it("renders the Partnership radio button with the correct value", () => {
      const $ = renderPage("business-water-supply", props);
      const $radioPrivate = $("#water_supply_private");
      expect($radioPrivate.get(0).attribs.value).toBe("PRIVATE");
    });
    it("renders the Representative radio button with the correct value", () => {
      const $ = renderPage("business-water-supply", props);
      const $radioBoth = $("#water_supply_both");
      expect($radioBoth.get(0).attribs.value).toBe("BOTH");
    });
    it("select the correct radio button based on session data", () => {
      const $ = renderPage("business-water-supply", props);
      const $selected = $("input:checked");
      expect($selected.get(0).attribs.value).toBe("PRIVATE");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("business-water-supply", {
        language: "cy",
        validatorErrors: {
          water_supply: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("business-water-supply", {
        language: "cy",
        validatorErrors: {
          water_supply: "test error"
        }
      });

      const $radioError = $("#water_supply-error");
      expect($radioError.length).toBe(1);
      expect($radioError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});