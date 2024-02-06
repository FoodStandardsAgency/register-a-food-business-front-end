/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    local_authority: "8015"
  },
  localAuthorities: [
    {
      _id: 8015,
      local_council: "Cardiff"
    }
  ],
  language: "en"
};

describe("la-selector", () => {
  it("renders without crashing", () => {
    const $ = renderPage("la-selector", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("We couldn't find your Local Authority");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("la-selector", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("select the correct dropdown item based on session data", () => {
    const $ = renderPage("la-selector", props);
    const $selected = $(":selected");
    expect($selected.contents().get(0).data).toBe("Cardiff");
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("la-selector", {
        language: "cy",
        validatorErrors: {
          local_authority: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
      expect($pageErrors.get(0).attribs.href).toBe("#local_authority");
    });
  });
});
