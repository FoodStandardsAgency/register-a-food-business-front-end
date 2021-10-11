const { axe, renderPage } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { establishment_type: "DOMESTIC" },
  language: "en"
};

describe("Establishment-Address-Type", () => {
  it("renders without crashing", () => {
    const $ = renderPage("establishment-address-type", props);

    const $mainHeading = $("h1");
    expect($mainHeading.text().trim()).toEqual(
      "Where is this establishment located?"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("establishment-address-type", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders 3 radio buttons", async () => {
    const $ = renderPage("establishment-address-type", props);

    const $establishmentAddressTypeRadio = $(":radio");
    expect($establishmentAddressTypeRadio.length).toBe(3);
  });

  describe("Radio boxes have correct value", () => {
    it("renders the Mobile radio button with the correct value", () => {
      const $ = renderPage("establishment-address-type", props);
      const $mainHeadingMobile = $("#establishment_type_mobile_moveable");
      expect($mainHeadingMobile.get(0).attribs.value).toBe("MOBILE");
    });
    it("renders the Domestic radio button with the correct value", () => {
      const $ = renderPage("establishment-address-type", props);
      const $mainHeadingDomestic = $("#establishment_type_home_domestic");
      expect($mainHeadingDomestic.get(0).attribs.value).toBe("DOMESTIC");
    });
    it("renders the Commercial radio button with the correct value", () => {
      const $ = renderPage("establishment-address-type", props);
      const $mainHeadingCommercial = $(
        "#establishment_type_business_commercial"
      );
      expect($mainHeadingCommercial.get(0).attribs.value).toBe("COMMERCIAL");
    });
    it("select the correct radio button based on session data", () => {
      const $ = renderPage("establishment-address-type", props);
      const $selected = $("input:checked");
      expect($selected.get(0).attribs.value).toBe("DOMESTIC");
    });
  });

  it("renders the correct error", async () => {
    const $ = renderPage("establishment-address-type", {
      language: "cy",
      validatorErrors: {
        establishment_type: "test error"
      }
    });

    const $pageErrors = $(".govuk-error-summary__list a");
    expect($pageErrors.length).toBe(1);
    expect($pageErrors.contents().get(0).data).toBe("test error");
  });
});
