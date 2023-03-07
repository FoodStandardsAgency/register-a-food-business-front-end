/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {},
  language: "en"
};

describe("la-not-onboarded", () => {
  it("renders without crashing", () => {
    const $ = renderPage("la-not-onboarded", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "Unfortunately, you cannot use this service"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("la-not-onboarded", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });
});
