const { axe, renderPage, getPageDetails } = require("../testHelpers")

const cumulativeFullAnswers = {
  opening_day_monday: "default"
};

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: cumulativeFullAnswers,
  language: "en"
};

describe("Opening-days-some", () => {
  it("renders without crashing", () => {
    const $ = renderPage("opening-days-some", props);
    
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "Opening days"
    );
  });

  it('passes accessibility tests', async () => {
    const $ = renderPage("opening-days-some", props)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  describe("renders 7 checkboxes with correct error props and default values", () => {
    it("renders 7 checkboxes", () => {
      const $ = renderPage("opening-days-some", props)

      const checkboxList = getPageDetails.getCheckboxes($);
      expect(checkboxList.length).toBe(7);
    });

    it("Monday checkbox gets given the correct default value", () => {
      const $ = renderPage("opening-days-some", props)

      const $openingSomeDaysCheckBox = $("#opening_day_monday");
      expect($openingSomeDaysCheckBox.get(0).attribs.value).toBe(
        "Monday")
    });

    it("Tuesday checkbox gets given the correct default value", () => {
      const $ = renderPage("opening-days-some", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_tuesday: "default"
        }
      });

      const $openingSomeDaysCheckBox = $("#opening_day_tuesday");
      expect($openingSomeDaysCheckBox.get(0).attribs.value).toBe(
        "Tuesday")
    });

    it("Wednesday checkbox gets given the correct default value", () => {
      const $ = renderPage("opening-days-some", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_wednesday: "default"
        }
      });

      const $openingSomeDaysCheckBox = $("#opening_day_wednesday");
      expect($openingSomeDaysCheckBox.get(0).attribs.value).toBe(
        "Wednesday")
    });

    it("Thursday checkbox gets given the correct default value", () => {
      const $ = renderPage("opening-days-some", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_thursday: "default"
        }
      });

      const $openingSomeDaysCheckBox = $("#opening_day_thursday");
      expect($openingSomeDaysCheckBox.get(0).attribs.value).toBe(
        "Thursday")
    });

    it("Friday checkbox gets given the correct default value", () => {
      const $ = renderPage("opening-days-some", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_friday: "default"
        }
      });

      const $openingSomeDaysCheckBox = $("#opening_day_friday");
      expect($openingSomeDaysCheckBox.get(0).attribs.value).toBe(
        "Friday")
    });

    it("Saturday checkbox gets given the correct default value", () => {
      const $ = renderPage("opening-days-some", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_saturday: "default"
        }
      });

      const $openingSomeDaysCheckBox = $("#opening_day_saturday");
      expect($openingSomeDaysCheckBox.get(0).attribs.value).toBe(
        "Saturday")
    });

    it("Sunday checkbox gets given the correct default value", () => {
      const $ = renderPage("opening-days-some", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_sunday: "default"
        }
      });

      const $openingSomeDaysCheckBox = $("#opening_day_sunday");
      expect($openingSomeDaysCheckBox.get(0).attribs.value).toBe(
        "Sunday")
    });
  })

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("opening-days-some", {
        language: "cy",
        validatorErrors: {
          opening_days_some: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("opening-days-some", {
        language: "cy",
        validatorErrors: {
          opening_days_some: "test error"
        }
      });

      const $checkboxError = $("#opening_days_some-error");
      expect($checkboxError.length).toBe(1);
      expect($checkboxError.contents().get(2).data.trim()).toBe("test error");
    });
  });
})