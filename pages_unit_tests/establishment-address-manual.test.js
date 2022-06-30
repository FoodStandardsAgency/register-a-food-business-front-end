/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    establishment_address_line_1: "Test Add1",
    establishment_town: "Test Town",
    establishment_postcode: "SE1 9AS",
    establishment_postcode_find: "SE1 9AS"
  },
  council: "cardiff",
  language: "en"
};

const $ = renderPage("establishment-address-manual", props);

describe("operator-address-manual", () => {
  it("It should pass accessibility tests", async () => {
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders correct backlink href when truthy switch of /establishment-address-none-found", async () => {
    const $ = renderPage("establishment-address-manual", {
      switches: { "/establishment-address-none-found": true },
      council: "cardiff"
    });
    const $backlink = getPageDetails.getBacklinkHref($);
    expect($backlink).toEqual("/new/cardiff/establishment-address");
  });

  it("renders correct backlink href when falsy switch of /establishment-address-none-found", async () => {
    const $ = renderPage("establishment-address-manual", {
      switches: { "/establishment-address-none-found": false },
      council: "cardiff"
    });
    const $backlink = getPageDetails.getBacklinkHref($);
    expect($backlink).toEqual("/new/cardiff/establishment-address-select");
  });

  it("renders without crashing", () => {
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "What is the establishment's address?"
    );
  });

  it("renders correct inset text", () => {
    const $detailsText = getPageDetails.getDetailsText($);
    expect($detailsText).toEqual(
      "An establishment is the location of your food business. If it is a mobile food business, please use the location where it is normally stored overnight."
    );
  });

  describe("It should have correct label together with input field and value", () => {
    it("renders operator manual address fields correctly", () => {
      const $postcode = $("#establishment_postcode");
      expect($postcode.get(0).attribs.name).toBe("establishment_postcode");
      expect($postcode.get(0).attribs.value).toBe("SE1 9AS");

      const $town = $("#establishment_town");
      expect($town.get(0).attribs.name).toBe("establishment_town");
      expect($town.get(0).attribs.value).toBe("Test Town");

      const $address1 = $("#establishment_address_line_1");
      expect($address1.get(0).attribs.name).toBe(
        "establishment_address_line_1"
      );
      expect($address1.get(0).attribs.value).toBe("Test Add1");
    });

    it("renders operator manual address labels correctly", () => {
      const $inputLabelTextAdd1 = getPageDetails.getInputLabelText($, 0);
      expect($inputLabelTextAdd1).toEqual("Address line 1");

      const $inputLabelTextAdd2 = getPageDetails.getInputLabelText($, 1);
      expect($inputLabelTextAdd2).toEqual("Address line 2 (optional)");

      const $inputLabelTextAdd3 = getPageDetails.getInputLabelText($, 2);
      expect($inputLabelTextAdd3).toEqual("Address line 3 (optional)");

      const $inputLabelTextTown = getPageDetails.getInputLabelText($, 3);
      expect($inputLabelTextTown).toEqual("Town or city");

      const $inputLabelTextPostcode = getPageDetails.getInputLabelText($, 4);
      expect($inputLabelTextPostcode).toEqual("Postcode");
    });
  });

  it("renders the correct errors", async () => {
    const $ = renderPage("establishment-address-manual", {
      language: "en",
      validatorErrors: {
        establishment_address_line_1: "Enter a valid first line of address",
        establishment_town: "Enter a valid town name",
        establishment_postcode: "Not a valid postcode"
      }
    });

    const $pageErrors = getPageDetails.getErrorSummaryLinks($);
    expect($pageErrors.length).toBe(3);
    expect($pageErrors.contents().get(0).data).toBe(
      "Enter a valid first line of address"
    );
    expect($pageErrors.contents().get(1).data).toBe("Enter a valid town name");
    expect($pageErrors.contents().get(2).data).toBe("Not a valid postcode");
  });
});
