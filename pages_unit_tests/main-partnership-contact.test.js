/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const propsWithThreePartnersArray = {
  validatorErrors: {},
  cumulativeFullAnswers: { partners: ["One", "Two", "Three"] },
  language: "en"
};

describe("main-partnership-contact", () => {
  it("renders without crashing", () => {
    const $ = renderPage("main-partnership-contact", propsWithThreePartnersArray);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Who is the main point of contact?");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("main-partnership-contact", propsWithThreePartnersArray);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders 3 radio buttons", async () => {
    const $ = renderPage("main-partnership-contact", propsWithThreePartnersArray);

    const $registrationRoleRadios = getPageDetails.getRadioButtons($);
    expect($registrationRoleRadios.length).toBe(3);
  });

  describe("Radio boxes have correct value", () => {
    it("renders the first person with the correct value", () => {
      const $ = renderPage("main-partnership-contact", propsWithThreePartnersArray);
      const $mainHeadingPerson = $("#partner-0");
      expect($mainHeadingPerson.get(0).attribs.value).toBe("One");
    });
    it("renders the second person with the correct value", () => {
      const $ = renderPage("main-partnership-contact", propsWithThreePartnersArray);
      const $mainHeadingCompany = $("#partner-1");
      expect($mainHeadingCompany.get(0).attribs.value).toBe("Two");
    });
    it("renders the third person with the correct value", () => {
      const $ = renderPage("main-partnership-contact", propsWithThreePartnersArray);
      const $mainHeadingCharity = $("#partner-2");
      expect($mainHeadingCharity.get(0).attribs.value).toBe("Three");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("main-partnership-contact", {
        language: "cy",
        validatorErrors: {
          partner_is_primary: "test error"
        },
        cumulativeFullAnswers: { partners: ["One", "Two", "Three"] }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });
  });

  describe("when main partnership contact is set", () => {
    it("is selected by default", () => {
      const $ = renderPage("main-partnership-contact", {
        language: "cy",
        validatorErrors: {},
        cumulativeFullAnswers: {
          partners: ["One", "Two", "Three"],
          main_partnership_contact: "One"
        }
      });

      const $radioError = $("#partner-0");
      expect($radioError.get(0).attribs.checked).not.toBeNull();
    });
  });
});
