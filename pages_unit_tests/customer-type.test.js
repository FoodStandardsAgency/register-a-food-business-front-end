/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { supply_directly: "END_CONSUMER" },
  language: "en"
};

describe("customer-type", () => {
  it("renders without crashing", () => {
    const $ = renderPage("customer-type", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Who will this establishment supply food to?");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("customer-type", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders 2 checkboxes buttons", async () => {
    const $ = renderPage("customer-type", props);

    const $customerTypeCheck = getPageDetails.getCheckboxes($);
    expect($customerTypeCheck.length).toBe(2);
  });

  describe("Checkboxes have correct value", () => {
    it("renders the other businesses check button with the correct value", () => {
      const $ = renderPage("customer-type", props);
      const $mainHeadingOtherBusiness = $("#customer_type_supply_other");
      expect($mainHeadingOtherBusiness.get(0).attribs.value).toBe("OTHER_BUSINESSES");
    });
    it("renders the end consumer check button with the correct value", () => {
      const $ = renderPage("customer-type", props);
      const $mainHeadingEndConsumer = $("#customer_type_supply_directly");
      expect($mainHeadingEndConsumer.get(0).attribs.value).toBe("END_CONSUMER");
    });

    it("select the correct checkboxes button based on session data", () => {
      const $ = renderPage("customer-type", props);
      const $selected = $("input:checked");
      expect($selected.get(0).attribs.value).toBe("END_CONSUMER");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("customer-type", {
        language: "cy",
        validatorErrors: {
          customer_type: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("customer-type", {
        language: "cy",
        validatorErrors: {
          customer_type: "test error"
        }
      });

      const $radioError = $("#customer_type-error");
      expect($radioError.length).toBe(1);
      expect($radioError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});
