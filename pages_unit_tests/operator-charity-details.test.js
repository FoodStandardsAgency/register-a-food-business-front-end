const { axe, renderPage, getPageDetails } = require("../testHelpers")

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {operator_charity_name: "default", operator_charity_number: "default"  },
  language: "en"
};


describe("operator-charity-details", () => {
  it("renders without crashing", () => {
    const $ = renderPage("operator-charity-details", props);
    
    const $mainHeading = getPageDetails.getMainHeading($)
    expect($mainHeading.text().trim()).toEqual('Details of the operating charity, organisation or trust')
  });

  it('passes accessibility tests', async () => {
    const $ = renderPage('operator-charity-details', props)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  describe("operator charity details input field", () => {
    it('renders', async () => {
      const $ = renderPage('operator-charity-details', props)
      const $inputBox = $('#operator_charity_name')
      expect($inputBox.length).toBe(1)
    });

    it("gets given the correct default value", () => {
      const $ = renderPage('operator-charity-details', props)
      
      const $inputBox = $('#operator_charity_name')
      expect($inputBox.get(0).attribs.value).toBe(
        "default"
      );
      });

      describe("establishment trading name input field", () => {
        it('renders', async () => {
          const $ = renderPage('operator-charity-details', props)
          const $inputBox = $('#operator_charity_number')
          expect($inputBox.length).toBe(1)
        });
    
        it("gets given the correct default value", () => {
          const $ = renderPage('operator-charity-details', props)
          
          const $inputBox = $('#operator_charity_number')
          expect($inputBox.get(0).attribs.value).toBe(
            "default"
          );
          });

    describe("Error messages displayed", () => {
      it("renders the correct summary error", async () => {
        const $ = renderPage("operator-charity-details", {
          language: "cy",
          validatorErrors: {
            operator_charity_name: "test error"
          }
        });

        const $pageErrors = getPageDetails.getErrorSummaryLinks($);
        expect($pageErrors.length).toBe(1);
        expect($pageErrors.contents().get(0).data).toBe("test error");
      });

      it("renders the correct error", async () => {
        const $ = renderPage("operator-charity-details", {
          language: "cy",
          validatorErrors: {
            operator_charity_number: "test error"
          }
        });

        const $inputError = $("#operator_charity_number-error");
        expect($inputError.length).toBe(1);
        expect($inputError.contents().get(2).data.trim()).toBe("test error");
      });
    });
  });
})
})