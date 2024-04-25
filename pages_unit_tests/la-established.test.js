/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {},
  language: "en",
  localAuthority: {
    local_council: "Cardiff"
  }
};

describe("la-established", () => {
  it("renders without crashing", () => {
    const $ = renderPage("la-established", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("You are registering with Cardiff");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("la-established", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });
  it("renders correct href link when 'It is the wrong LA", async () => {
    const $ = renderPage("la-established", {
      council: "cardiff"
    });
    const $wrongLAlink = $(".govuk-grid-column-full a").get(0).attribs.href.trim();
    expect($wrongLAlink).toEqual("/new/la-selector?back=/wrong-la");
  });
});
