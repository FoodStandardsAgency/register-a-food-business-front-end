/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  localAuthorities: [
    {
      _id: 1111,
      local_council: "Test Council",
      local_council_url: "test"
    },
    {
      _id: 2222,
      local_council: "Test Council 2",
      local_council_url: "test2"
    }
  ]
};

const $ = renderPage("la-selector", props);

describe("la-selector", () => {
  it("It should pass accessibility tests", async () => {
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "We couldn't find your Local Authority"
    );
  });

  it("renders the select dropdown", () => {
    const $localAuthorities = $("#local_authority");
    const $localAuthoritiesItems = $("#local_authority option");
    expect($localAuthoritiesItems.length).toBe(3);
    expect($localAuthorities.length).toBe(1);
    expect($localAuthoritiesItems.contents().get(0).data.trim()).toEqual(
      "Test Council"
    );
  });
});
