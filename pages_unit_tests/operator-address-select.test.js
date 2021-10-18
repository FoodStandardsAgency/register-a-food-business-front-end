const { axe, renderPage, getPageDetails } = require("../testHelpers");

const exampleAddressLookup = {
  operator_postcode_find: [
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
    registration_role: "PARTNERSHIP",
    operator_postcode_find: "NR14 7PZ"
  },
  council: "cardiff",
  language: "en",
  addressLookups: exampleAddressLookup
};

const $ = renderPage("operator-address-select", props);

describe("operator-address-select", () => {
  it("It should pass accessibility tests", async () => {
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "Which is the partnership contact's address from the list?"
    );
  });

  it("renders correct inset text", () => {
    const $insetText = getPageDetails.getInsetText($);
    expect($insetText).toEqual(
      "Partnership address is the contact address for the partner who is the main point of contact."
    );
  });

  describe("when registration role is not a partnership", () => {
    it("renders correct header", () => {
      const $ = renderPage("operator-address-select", {
        language: "en",
        cumulativeFullAnswers: {
          registration_role: "Test"
        },
        addressLookups: exampleAddressLookup
      });
      const $mainHeading = getPageDetails.getMainHeading($);
      expect($mainHeading.text().trim()).toEqual(
        "Which is the operator's address from the list?"
      );
    });

    it("renders correct insetText", () => {
      const $ = renderPage("operator-address-select", {
        language: "en",
        cumulativeFullAnswers: {
          registration_role: "Test"
        },
        addressLookups: exampleAddressLookup
      });
      const $insetText = getPageDetails.getInsetText($);
      expect($insetText).toEqual(
        "Operator address is the contact address for the operator. For example home address for a sole trader or headquarters address for a limited company."
      );
    });
  });

  describe("Operator postcode display", () => {
    it("renders correct post code entered link href when truthy switch of props.editModeFirstPage", async () => {
      const $ = renderPage("operator-address-select", {
        editModeFirstPage: true,
        council: "cardiff",
        addressLookups: exampleAddressLookup
      });
      const $postCodeEnteredlink = $(".govuk-summary-list__actions a")
        .get(0)
        .attribs.href.trim();
      expect($postCodeEnteredlink).toEqual(
        "/new/cardiff/operator-address?edit=operator-address"
      );
    });

    it("renders correct post code entered link href when falsy switch of props.editModeFirstPage", async () => {
      const $ = renderPage("operator-address-select", {
        editModeFirstPage: false,
        council: "cardiff",
        addressLookups: exampleAddressLookup
      });
      const $postCodeEnteredlink = $(".govuk-summary-list__actions a")
        .get(0)
        .attribs.href.trim();
      expect($postCodeEnteredlink).toEqual("/new/cardiff/operator-address");
    });

    it("renders correct href link when 'I can't find my address in the list' is truthy and switch of props.editModeFirstPage", async () => {
      const $ = renderPage("operator-address-select", {
        editModeFirstPage: true,
        council: "cardiff",
        addressLookups: exampleAddressLookup
      });
      const $postCodeNotFindlink = $(".govuk-grid-column-full a")
        .get(1)
        .attribs.href.trim();
      expect($postCodeNotFindlink).toEqual(
        "/new/cardiff/operator-address-manual?edit=operator-address-manual"
      );
    });

    it("renders correct href link when 'I can't find my address in the list' is falsy and switch of props.editModeFirstPage", async () => {
      const $ = renderPage("operator-address-select", {
        editModeFirstPage: false,
        council: "cardiff",
        addressLookups: exampleAddressLookup
      });
      const $postCodeNotFindlink = $(".govuk-grid-column-full a")
        .get(1)
        .attribs.href.trim();
      expect($postCodeNotFindlink).toEqual(
        "/new/cardiff/operator-address-manual"
      );
    });

    it("renders the select dropdown according to the addressLookups object for postcode entered", () => {
      const $ = renderPage("operator-address-select", {
        cumulativeFullAnswers: {
          operator_postcode_find: "NR14 7PZ"
        },
        addressLookups: exampleAddressLookup
      });

      const $operatorAddressSelected = $("#operatorAddressDropdown");
      const $operatorAddressSelectItems = $("#operatorAddressDropdown option");
      expect($operatorAddressSelectItems.length).toBe(2);
      expect($operatorAddressSelected.length).toBe(1);
      expect($operatorAddressSelectItems.contents().get(0).data.trim()).toEqual(
        "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ"
      );
    });
  });
});
