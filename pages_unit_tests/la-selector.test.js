/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    local_authority: "8015"
  },
  localAuthorities: [
    {
      _id: 8015,
      local_council: "Cardiff"
    }
  ],
  language: "en"
};

describe("la-selector", () => {
  it("renders without crashing", () => {
    const $ = renderPage("la-selector", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "We couldn't find your Local Authority"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("la-selector", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("select the correct dropdown item based on session data", () => {
    const $ = renderPage("la-selector", props);
    const $selected = $(":selected");
    expect($selected.contents().get(0).data).toBe("Cardiff");
  });

  it("renders the local_authority_not_found radio button with the correct value", () => {
    const $ = renderPage("la-selector", props);
    const $radio = $("#local_authority_not_found");
    expect($radio.get(0).attribs.value).toBe("yes");
  });
});
