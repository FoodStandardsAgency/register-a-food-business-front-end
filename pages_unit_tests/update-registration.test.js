/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {},
  language: "en",
  local_council_info: {
    local_council: "Council name",
    local_council_email: "council@example.com",
    local_council_phone_number: "123456789"
  }
};

describe("Update Registration", () => {
  it("renders without crashing", () => {
    const $ = renderPage("update-registration", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toContain("Your local authority is");
  });

  it("renders correct href link when 'It is the wrong LA", async () => {
    const $ = renderPage("la-established", {
      council: "cardiff"
    });
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("update-registration", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });
});
