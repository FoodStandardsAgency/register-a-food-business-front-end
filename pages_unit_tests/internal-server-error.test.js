const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { },
  language: "en",
  council:"council"
};

describe("internal-server-error", () => {
  it("renders without crashing", () => {
    const $ = renderPage("internal-server-error", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "This service is currently unavailable"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("internal-server-error", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("has a back to start button with correct link when council set", () => {
    const $ = renderPage("internal-server-error", props)

    const $backLink = $(".govuk-back-link");
    expect($backLink.get(0).attribs.href).toBe(
      "/new/council")
  });

  it("has a back to start button with correct link when council set", () => {
    const $ = renderPage("internal-server-error", props)

    const $returnButton = $("#server-error-form");
    expect($returnButton.get(0).attribs.href).toBe(
      "https://www.food.gov.uk/business-guidance/register-a-food-business")
  });
});
