/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const allDaysOpen = {
  opening_day_monday: "Monday",
  opening_day_tuesday: "Tuesday",
  opening_day_wednesday: "Wednesday",
  opening_day_thursday: "Thursday",
  opening_day_friday: "Friday",
  opening_day_saturday: "Saturday",
  opening_day_sunday: "Sunday"
};

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { allDaysOpen },
  language: "en"
};

describe("opening-hours", () => {
  it("renders without crashing", () => {
    const $ = renderPage("opening-hours", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Opening hours");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("opening-hours", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("renders input fields for days the establishment is open with correct error props and default values", () => {
    it("renders Monday input field when open", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_monday: "Monday" }
      });
      const $openingHoursMonday = $("#opening_hours_monday");
      expect($openingHoursMonday.length).toBe(1);
    });

    it("renders Tuesday input field when open", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_tuesday: "Tuesday" }
      });
      const $openingHoursTuesday = $("#opening_hours_tuesday");
      expect($openingHoursTuesday.length).toBe(1);
    });

    it("renders Wednesday input field when open", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_wednesday: "Wednesday" }
      });
      const $openingHoursWednesday = $("#opening_hours_wednesday");
      expect($openingHoursWednesday.length).toBe(1);
    });

    it("renders Thursday input field when open", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_thursday: "Thursday" }
      });
      const $openingHoursThursday = $("#opening_hours_thursday");
      expect($openingHoursThursday.length).toBe(1);
    });

    it("renders Friday input field when open", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_friday: "Friday" }
      });
      const $openingHoursFriday = $("#opening_hours_friday");
      expect($openingHoursFriday.length).toBe(1);
    });

    it("renders Saturday input field when open", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_saturday: "Saturday" }
      });
      const $openingHoursSaturday = $("#opening_hours_saturday");
      expect($openingHoursSaturday.length).toBe(1);
    });

    it("renders Sunday input field when open", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_sunday: "Sunday" }
      });
      const $openingHoursSunday = $("#opening_hours_sunday");
      expect($openingHoursSunday.length).toBe(1);
    });

    it("Monday input field gets given the correct default value", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_monday: "Monday",
          opening_hours_monday: "default"
        }
      });
      const $openingHoursMonday = $("#opening_hours_monday");
      expect($openingHoursMonday.get(0).attribs.value).toBe("default");
    });

    it("Tuesday input field gets given the correct default value", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_tuesday: "Tuesday",
          opening_hours_tuesday: "default"
        }
      });
      const $openingHoursTuesday = $("#opening_hours_tuesday");
      expect($openingHoursTuesday.get(0).attribs.value).toBe("default");
    });

    it("Wednesday input field gets given the correct default value", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_wednesday: "Wednesday",
          opening_hours_wednesday: "default"
        }
      });
      const $openingHoursWednesday = $("#opening_hours_wednesday");
      expect($openingHoursWednesday.get(0).attribs.value).toBe("default");
    });

    it("Thursday input field gets given the correct default value", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_thursday: "Thursday",
          opening_hours_thursday: "default"
        }
      });
      const $openingHoursThursday = $("#opening_hours_thursday");
      expect($openingHoursThursday.get(0).attribs.value).toBe("default");
    });

    it("Friday input field gets given the correct default value", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_friday: "Friday",
          opening_hours_friday: "default"
        }
      });
      const $openingHoursFriday = $("#opening_hours_friday");
      expect($openingHoursFriday.get(0).attribs.value).toBe("default");
    });

    it("Saturday input field gets given the correct default value", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_saturday: "Saturday",
          opening_hours_saturday: "default"
        }
      });
      const $openingHoursSaturday = $("#opening_hours_saturday");
      expect($openingHoursSaturday.get(0).attribs.value).toBe("default");
    });

    it("Sunday input field gets given the correct default value", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: {
          opening_day_sunday: "Sunday",
          opening_hours_sunday: "default"
        }
      });
      const $openingHoursSunday = $("#opening_hours_sunday");
      expect($openingHoursSunday.get(0).attribs.value).toBe("default");
    });

    it("renders the correct summary error", async () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_monday: "Monday" },
        validatorErrors: {
          opening_hours_monday: "invalid opening hours on monday"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("invalid opening hours on monday");
    });

    it("renders correct error message for Monday field", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_monday: "Monday" },
        validatorErrors: {
          opening_hours_monday: "invalid opening hours on monday"
        }
      });
      const $openingHoursMondayError = $("#opening_hours_monday-error");
      expect($openingHoursMondayError.contents().get(2).data.trim()).toBe(
        "invalid opening hours on monday"
      );
    });

    it("renders correct error message for Tuesday field", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_tuesday: "Tuesday" },
        validatorErrors: {
          opening_hours_tuesday: "invalid opening hours on tuesday"
        }
      });
      const $openingHoursTuesdayError = $("#opening_hours_tuesday-error");
      expect($openingHoursTuesdayError.contents().get(2).data.trim()).toBe(
        "invalid opening hours on tuesday"
      );
    });

    it("renders correct error message for Wednesday field", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_wednesday: "Wednesday" },
        validatorErrors: {
          opening_hours_wednesday: "invalid opening hours on wednesday"
        }
      });
      const $openingHoursWednesdayError = $("#opening_hours_wednesday-error");
      expect($openingHoursWednesdayError.contents().get(2).data.trim()).toBe(
        "invalid opening hours on wednesday"
      );
    });

    it("renders correct error message for Thursday field", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_thursday: "Thursday" },
        validatorErrors: {
          opening_hours_thursday: "invalid opening hours on thursday"
        }
      });
      const $openingHoursThursdayError = $("#opening_hours_thursday-error");
      expect($openingHoursThursdayError.contents().get(2).data.trim()).toBe(
        "invalid opening hours on thursday"
      );
    });

    it("renders correct error message for Friday field", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_friday: "Friday" },
        validatorErrors: {
          opening_hours_friday: "invalid opening hours on friday"
        }
      });
      const $openingHoursFridayError = $("#opening_hours_friday-error");
      expect($openingHoursFridayError.contents().get(2).data.trim()).toBe(
        "invalid opening hours on friday"
      );
    });

    it("renders correct error message for Saturday field", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_saturday: "Saturday" },
        validatorErrors: {
          opening_hours_saturday: "invalid opening hours on saturday"
        }
      });
      const $openingHoursSaturday = $("#opening_hours_saturday-error");
      expect($openingHoursSaturday.contents().get(2).data.trim()).toBe(
        "invalid opening hours on saturday"
      );
    });

    it("renders correct error message for Sunday field", () => {
      const $ = renderPage("opening-hours", {
        language: "cy",
        cumulativeFullAnswers: { opening_day_sunday: "Sunday" },
        validatorErrors: {
          opening_hours_sunday: "invalid opening hours on sunday"
        }
      });
      const $openingHoursSunday = $("#opening_hours_sunday-error");
      expect($openingHoursSunday.contents().get(2).data.trim()).toBe(
        "invalid opening hours on sunday"
      );
    });
  });
});
