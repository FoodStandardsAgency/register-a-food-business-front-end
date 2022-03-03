const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { },
  language: "en"
};

const propsWith5PartnersArray = {
  validatorErrors: {},
  cumulativeFullAnswers: { partners: ["one", "two", "three", "four", "five"] },
  language: "en"
};

const propsWith2PartnersArray = {
  validatorErrors: {},
  cumulativeFullAnswers: { partners: ["one", "two"] },
  language: "en"
};

describe("partner-name", () => {
  it("renders without crashing", () => {
    const $ = renderPage("partner-name", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "What are the partners' names?"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("partner-name", propsWith5PartnersArray);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("when partners array is not defined", () => {
    it("does not render PartnersTable but renders add partner button", () => {
      let $answer;
      const $ = renderPage("partner-name", props);

      $answer = $(".govuk-table"); 
      expect($answer.length).toBe(0);

      $answer = $(".govuk-table__body"); 
      expect($answer.length).toBe(0);

      $answer = $("#addPartnerButton"); 
      expect($answer.length).toBe(1);

    });
  });

  describe("when 5 partners are defined", () => {
    it("Renders PartnersTable but not add partner button", () => {
      let $answer;
      const $ = renderPage("partner-name", propsWith5PartnersArray);

      $answer = $(".govuk-table"); 
      expect($answer.length).toBe(1);

      $answer = $(".govuk-table__body"); 
      expect($answer.length).toBe(1);

      $answer = $("#addPartnerButton"); 
      expect($answer.length).toBe(0);
      
    });
  });

  describe("when 2 partners are defined", () => {
    it("renders the partner table and button", () => {
      let $answer;
      const $ = renderPage("partner-name", propsWith2PartnersArray);

      $answer = $(".govuk-table"); 
      expect($answer.length).toBe(1);

      $answer = $(".govuk-table__body"); 
      expect($answer.length).toBe(1);

      $answer = $("#addPartnerButton"); 
      expect($answer.length).toBe(1);
      
    });
  });
});