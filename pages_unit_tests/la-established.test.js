/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  localAuthority: {
    _id: 4022,
    local_council: "Test Council"
  }
};

const $ = renderPage("la-established", props);

describe("la-established", () => {
  it("It should pass accessibility tests", async () => {
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "You are registering with Test Council"
    );
  });
});
