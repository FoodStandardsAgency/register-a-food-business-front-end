/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {},
  language: "en"
};

describe("Index", () => {
  it("renders without crashing", () => {
    const $ = renderPage("index", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Register a Food Business");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("index", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });
  it("renders Google Analytic tag", async () => {
    const $ = renderPage("index", props);

    const results = await axe($.html());
    expect($("script").get(0).attribs.src).toBe(
      "https://www.googletagmanager.com/gtag/js?id=G-YCZ4TF8DJM"
    );
  });
});
