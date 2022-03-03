const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { day: "01", month: "01", year: "1111" },
  language: "en"
};

describe("establishment-opening-date-proactive", () => {
  it("renders without crashing", () => {
    const $ = renderPage("establishment-opening-date-proactive", props);
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "Opening Date"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("establishment-opening-date-proactive", props);
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("opening days irregular input field", () => {
    it("check that day is correct", async () => {
      const $ = renderPage('establishment-opening-date-proactive', props);
      const $textArea = $('#day');
      expect($textArea.get(0).attribs.value).toBe("01");
    });

    it("check that month is correct", async () => {
      const $ = renderPage('establishment-opening-date-proactive', props);
      const $textArea = $('#month');
      expect($textArea.get(0).attribs.value).toBe("01");
    });

    it("check that year is correct", async () => {
      const $ = renderPage('establishment-opening-date-proactive', props);
      const $textArea = $('#year');
      expect($textArea.get(0).attribs.value).toBe("1111");
    });
      
    describe("Error messages displayed", () => {
      it("renders the correct summary error", async () => {
        const $ = renderPage("establishment-opening-date-proactive", {
          language: "cy",
          validatorErrors: {
              establishment_opening_date: "test error"
          }
        });

        const $pageErrors = getPageDetails.getErrorSummaryLinks($);
        expect($pageErrors.length).toBe(1);
        expect($pageErrors.contents().get(0).data).toBe("test error");
      });
  
        it("renders the correct error", async () => {
          const $ = renderPage("establishment-opening-date-proactive", {
          language: "cy",
          validatorErrors: {
              establishment_opening_date: "test error"
          }
        });
  
        const $inputError = $("#establishment_opening_date-error");
        expect($inputError.length).toBe(1);
        expect($inputError.contents().get(2).data.trim()).toBe("test error");
        });
    });
  });
});
