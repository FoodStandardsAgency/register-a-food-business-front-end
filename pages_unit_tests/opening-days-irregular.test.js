const { axe, renderPage, getPageDetails } = require("../testHelpers")

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { opening_days_irregular: "default" },
  language: "en"
};

describe("opening-days-irregular", () => {
  it("renders without crashing", () => {
    const $ = renderPage("opening-days-irregular", props);
    
    const $mainHeading = getPageDetails.getMainHeading($)
    expect($mainHeading.text().trim()).toEqual('Opening periods')
  });

  it('passes accessibility tests', async () => {
    const $ = renderPage('opening-days-irregular', props)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  describe("opening days irregular input field", () => {
    it("renders", async () => {
      const $ = renderPage('opening-days-irregular', props);
      const $textArea = $('#opening_days_irregular');
      expect($textArea.length).toBe(1);
    });

    it("gets given the correct default value", () => {
      const $ = renderPage('opening-days-irregular', props);
      const $textArea = $('#opening_days_irregular');
      expect($textArea.get(0).children[0].data).toBe("default");
      });

    describe("Error messages displayed", () => {
      it("renders the correct summary error", async () => {
        const $ = renderPage("opening-days-irregular", {
          language: "cy",
          validatorErrors: {
            establishment_trading_name: "test error"
          }
        });

        const $pageErrors = getPageDetails.getErrorSummaryLinks($);
        expect($pageErrors.length).toBe(1);
        expect($pageErrors.contents().get(0).data).toBe("test error");
      });

      it("renders the correct error", async () => {
        const $ = renderPage("opening-days-irregular", {
          language: "cy",
          validatorErrors: {
            opening_days_irregular: "test error"
          }
        });

        const $inputError = $("#opening_days_irregular-error");
        expect($inputError.length).toBe(1);
        expect($inputError.contents().get(2).data.trim()).toBe("test error");
      });
    });
  });
})