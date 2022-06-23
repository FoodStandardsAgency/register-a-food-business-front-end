/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const exampleAddressLookup = {
  establishment_postcode_find: [
    {
      addressline1: "Allies Computing Ltd",
      addressline2: "Manor Farm Barns",
      addressline3: "Fox Road",
      addressline4: "Framingham Pigot",
      summaryline:
        "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
      organisation: "Allies Computing Ltd",
      buildingname: "Manor Farm Barns",
      premise: "Manor Farm Barns",
      street: "Fox Road",
      dependentlocality: "Framingham Pigot",
      posttown: "Norwich",
      county: "Norfolk",
      postcode: "NR14 7PZ"
    },
    {
      addressline1: "Room 36",
      addressline2: "Block 1 Arthur Vick",
      addressline3: "Gibbet Hill Road",
      summaryline:
        "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
      subbuildingname: "Room 36",
      buildingname: "Block 1 Arthur Vick",
      premise: "Room 36, Block 1 Arthur Vick",
      street: "Gibbet Hill Road",
      posttown: "Norwich",
      county: "Norfolk",
      postcode: "NR14 7PZ"
    }
  ]
};

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    establishment_postcode_find: "NR14 7PZ"
  },
  council: "cardiff",
  language: "en",
  addressLookups: exampleAddressLookup
};

const $ = renderPage("establishment-address-select", props);

describe("establishment-address-select", () => {
  it("It should pass accessibility tests", async () => {
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "Which is the establishment's address from the list?"
    );
  });

  it("renders correct inset text", () => {
    const $detailsText = getPageDetails.getDetailsText($);
    expect($detailsText).toEqual(
      "An establishment is the location of your food business. If it is a mobile food business, please use the location where it is normally stored overnight."
    );
  });

  describe("Establishment postcode display", () => {
    it("renders correct post code entered link href when truthy switch of props.editModeFirstPage", async () => {
      const $ = renderPage("establishment-address-select", {
        editModeFirstPage: true,
        council: "cardiff",
        addressLookups: exampleAddressLookup
      });
      const $postCodeEnteredlink = $(".govuk-summary-list__actions a")
        .get(0)
        .attribs.href.trim();
      expect($postCodeEnteredlink).toEqual(
        "/new/cardiff/establishment-address?edit=establishment-address"
      );
    });

    it("renders correct post code entered link href when falsy switch of props.editModeFirstPage", async () => {
      const $ = renderPage("establishment-address-select", {
        editModeFirstPage: false,
        council: "cardiff",
        addressLookups: exampleAddressLookup
      });
      const $postCodeEnteredlink = $(".govuk-summary-list__actions a")
        .get(0)
        .attribs.href.trim();
      expect($postCodeEnteredlink).toEqual(
        "/new/cardiff/establishment-address"
      );
    });

    it("renders correct href link when 'I can't find my address in the list' is truthy and switch off props.editModeFirstPage", async () => {
      const $ = renderPage("establishment-address-select", {
        editModeFirstPage: true,
        council: "cardiff",
        addressLookups: exampleAddressLookup
      });
      const $postCodeNotFindlink = $(".govuk-grid-column-full a")
        .get(0)
        .attribs.href.trim();
      expect($postCodeNotFindlink).toEqual(
        "/new/cardiff/establishment-address-manual?edit=establishment-address-manual"
      );
    });

    it("renders correct href link when 'I can't find my address in the list' is falsy and switch of props.editModeFirstPage", async () => {
      const $ = renderPage("establishment-address-select", {
        editModeFirstPage: false,
        council: "cardiff",
        addressLookups: exampleAddressLookup
      });
      const $postCodeNotFindlink = $(".govuk-grid-column-full a")
        .get(0)
        .attribs.href.trim();
      expect($postCodeNotFindlink).toEqual(
        "/new/cardiff/establishment-address-manual"
      );
    });

    it("renders the select dropdown according to the addressLookups object for postcode entered", () => {
      const $ = renderPage("establishment-address-select", {
        cumulativeFullAnswers: {
          establishment_postcode_find: "NR14 7PZ"
        },
        addressLookups: exampleAddressLookup
      });

      const $establishmentAddressSelected = $("#establishmentAddressDropdown");
      const $establishmentAddressSelectedItems = $(
        "#establishmentAddressDropdown option"
      );
      expect($establishmentAddressSelectedItems.length).toBe(2);
      expect($establishmentAddressSelected.length).toBe(1);
      expect(
        $establishmentAddressSelectedItems.contents().get(0).data.trim()
      ).toEqual(
        "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
      );
    });
  });
});
