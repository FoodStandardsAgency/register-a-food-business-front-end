/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const propsWithTwoPartnersArray = {
  validatorErrors: {},
  cumulativeFullAnswers: { partners: ["one", "two"], targetPartner: "0" },
  language: "en"
};

describe("partner-details", () => {
  it("renders without crashing", () => {
    const $ = renderPage("partner-details", propsWithTwoPartnersArray);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Edit partner's name");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("partner-details", propsWithTwoPartnersArray);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("It should have correct label together with input field and value", () => {
    const $ = renderPage("partner-details", propsWithTwoPartnersArray);
    it("renders partner name details fields correctly", () => {
      const $partnerName = $("#partner_name");
      expect($partnerName.get(0).attribs.name).toBe("partner_name");
      expect($partnerName.get(0).attribs.value).toBe("one");
    });

    it("renders partner-name hint labels correctly", () => {
      const $inputLabelTextPartnerName = $("#partner_name-hint");
      expect($inputLabelTextPartnerName.get(0).children[0].data.trim()).toEqual(
        "Full name"
      );
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("partner-details", {
        language: "cy",
        validatorErrors: {
          partner_name: "test error"
        },
        cumulativeFullAnswers: { partners: ["one", "two"], targetPartner: "0" }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("partner-details", {
        language: "cy",
        validatorErrors: {
          partner_name: "test error"
        },
        cumulativeFullAnswers: { partners: ["one", "two"], targetPartner: "0" }
      });

      const $insertError = $("#partner_name-error");
      expect($insertError.length).toBe(1);
      expect($insertError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});
