/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    registration_role: "PARTNERSHIP",
    operator_address_line_1: "Test Add1",
    operator_town: "Test Town",
    operator_postcode: "SE1 9AS",
    establishment_postcode_find: "SE1 9AS"
  },
  council: "cardiff",
  language: "en"
};

const $ = renderPage("operator-address-manual", props);

describe("operator-address-manual", () => {
  it("It should pass accessibility tests", async () => {
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders correct backlink href when truthy switch of /operator-address-none-found", async () => {
    const $ = renderPage("operator-address-manual", {
      switches: { "/operator-address-none-found": true },
      council: "cardiff"
    });
    const $backlink = getPageDetails.getBacklinkHref($);
    expect($backlink).toEqual("/new/operator-address");
  });

  it("renders correct backlink href when falsy switch of /operator-address-none-found", async () => {
    const $ = renderPage("operator-address-manual", {
      switches: { "/operator-address-none-found": false },
      council: "cardiff"
    });
    const $backlink = getPageDetails.getBacklinkHref($);
    expect($backlink).toEqual("/new/operator-address-select");
  });

  it("renders without crashing", () => {
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "What is the partnership contact's address?"
    );
  });

  it("renders correct inset text", () => {
    const $insetText = getPageDetails.getInsetText($);
    expect($insetText).toEqual(
      "Partnership address is the contact address for the partner who is the main point of contact."
    );
  });

  describe("It should have correct label together with input field and value", () => {
    it("renders operator manual address fields correctly", () => {
      const $postcode = $("#operator_postcode");
      expect($postcode.get(0).attribs.name).toBe("operator_postcode");
      expect($postcode.get(0).attribs.value).toBe("SE1 9AS");

      const $town = $("#operator_town");
      expect($town.get(0).attribs.name).toBe("operator_town");
      expect($town.get(0).attribs.value).toBe("Test Town");

      const $address1 = $("#operator_address_line_1");
      expect($address1.get(0).attribs.name).toBe("operator_address_line_1");
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

  describe("when registration role is not a partnership", () => {
    it("renders correct header", () => {
      const $ = renderPage("operator-address-manual", {
        language: "en",
        cumulativeFullAnswers: {
          registration_role: "Test"
        }
      });
      const $mainHeading = getPageDetails.getMainHeading($);
      expect($mainHeading.text().trim()).toEqual(
        "What is the operator's address?"
      );
    });

    it("renders correct insetText", () => {
      const $ = renderPage("operator-address-manual", {
        language: "en",
        cumulativeFullAnswers: {
          registration_role: "Test"
        }
      });
      const $insetText = getPageDetails.getInsetText($);
      expect($insetText).toEqual(
        "Operator address is the contact address for the operator. For example home address for a sole trader or headquarters address for a limited company."
      );
    });
  });

  it("renders the correct errors", async () => {
    const $ = renderPage("operator-address-manual", {
      language: "en",
      validatorErrors: {
        operator_address_line_1: "Enter a valid first line of address",
        operator_town: "Enter a valid town name",
        operator_postcode: "Not a valid postcode"
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
