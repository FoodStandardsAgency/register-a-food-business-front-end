/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    establishment_postcode_find: "SE1 9AS"
  },
  language: "en"
};

const $ = renderPage("establishment-address", props);

describe("establishment-address", () => {
  it("It should pass accessibility tests", async () => {
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "What is the establishment's postcode?"
    );
  });

  it("renders correct details text", () => {
    const $detailText = getPageDetails.getDetailsText($);
    expect($detailText).toEqual(
      "An establishment is the location of your food business. If it is a mobile food business, please use the location where it is normally stored overnight."
    );
  });

  describe("It should have correct label together with input field and value", () => {
    it("renders establishment postcode field correctly", () => {
      const $postcode = $("#establishment_postcode_find");
      expect($postcode.get(0).attribs.name).toBe("establishment_postcode_find");
      expect($postcode.get(0).attribs.value).toBe("SE1 9AS");
    });

    it("renders establishment postcode lablel correctly", () => {
      const $inputLabelText = getPageDetails.getInputLabelText($, 0);
      expect($inputLabelText).toEqual("Postcode");
    });
  });

  it("renders the correct error", async () => {
    const $ = renderPage("establishment-address", {
      language: "en",
      validatorErrors: {
        establishment_postcode_find: "Not a valid postcode"
      }
    });

    const $pageErrors = getPageDetails.getErrorSummaryLinks($);
    expect($pageErrors.length).toBe(1);
    expect($pageErrors.contents().get(0).data).toBe("Not a valid postcode");
  });
});
