/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    operator_postcode_find: "SE1 9AS",
    registration_role: "PARTNERSHIP"
  },
  language: "en"
};

const $ = renderPage("operator-address", props);

describe("Operator-address", () => {
  it("It should pass accessibility tests", async () => {
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "What is the partnership contact's postcode?"
    );
  });

  it("renders correct Inset text", () => {
    const $insetText = getPageDetails.getHintText($);
    expect($insetText).toEqual(
      "Partnership address is the contact address for the partner who is the main point of contact."
    );
  });

  describe("It should have correct input fields and value", () => {
    it("renders operator postcode field correctly", () => {
      const $postcode = $("#operator_postcode_find");
      expect($postcode.get(0).attribs.name).toBe("operator_postcode_find");
      expect($postcode.get(0).attribs.value).toBe("SE1 9AS");
    });
  });

  describe("when registration role is not a partnership", () => {
    it("renders correct header", () => {
      const $ = renderPage("operator-address", {
        language: "en",
        cumulativeFullAnswers: {
          registration_role: "Test"
        }
      });
      const $mainHeading = getPageDetails.getMainHeading($);
      expect($mainHeading.text().trim()).toEqual(
        "What is the operator's postcode?"
      );
    });
  });

  it("renders the correct error", async () => {
    const $ = renderPage("operator-address", {
      language: "en",
      validatorErrors: {
        operator_postcode_find: "Not a valid postcode"
      }
    });

    const $pageErrors = getPageDetails.getErrorSummaryLinks($);
    expect($pageErrors.length).toBe(1);
    expect($pageErrors.contents().get(0).data).toBe("Not a valid postcode");
  });

  it("renders the correct text on button", () => {
    const $buttonText = getPageDetails.getButtonText($);
    expect($buttonText).toEqual("Find address");
  });
});
