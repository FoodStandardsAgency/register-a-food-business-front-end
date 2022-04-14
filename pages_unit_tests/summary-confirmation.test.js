const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  transformedData: {establishment_address_line_1: "Example address line 1"},
  language: "en"
};

const cumulativeFullAnswers = {
  establishment_address_line_1: "Example address line 1"
};

const transformedData = {
  operator_email: "email@email.com"
};

const lcConfigCombined = {
  hygieneAndStandards: {
    local_council: "Council name",
    local_council_email: "council@example.com",
    local_council_phone_number: "123456789"
  }
};

const lcConfigCombinedNoNumber = {
  hygieneAndStandards: {
    local_council: "Council name",
    local_council_email: "council@example.com"
  }
};

const lcConfigSplit = {
  hygiene: {
    local_council: "Hygiene council name",
    local_council_email: "hygiene@example.com",
    local_council_phone_number: "123456789"
  },
  standards: {
    local_council: "Standards council name",
    local_council_email: "standards@example.com",
    local_council_phone_number: "123456789"
  }
};

const lcConfigSplitNoNumber = {
  hygiene: {
    local_council: "Hygiene council name",
    local_council_email: "hygiene@example.com"
  },
  standards: {
    local_council: "Standards council name",
    local_council_email: "standards@example.com"
  }
};


describe("summary-confirmation", () => {
  it("renders without crashing", () => {
    const $ = renderPage("summary-confirmation", props);
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "Submission complete"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("summary-confirmation", props);
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("SummaryTable component renders", () => {
    const $ = renderPage("summary-confirmation", {
      language: "cy",
      cumulativeFullAnswers: cumulativeFullAnswers,
      applicationCompletePage: true,
      fsaRegistrationNumber: "12345",
      lcConfig: lcConfigCombined,
      transformedData: transformedData
    });
    const $answer = $(".govuk-fieldset" ); 
    expect($answer.length).toBe(1);
  });

  describe("When given fsaRegistrationNumber", () => {
    it("The panel renders the number when defined", () => {
      const $ = renderPage("summary-confirmation", {
        language: "cy",
        cumulativeFullAnswers: cumulativeFullAnswers,
        applicationCompletePage: true,
        fsaRegistrationNumber: "12345",
        lcConfig: lcConfigCombined,
        transformedData: transformedData
      });
      const $panel = $("#fsa-rn");
      expect($panel.length).toBe(1);
    });
    it("The panel renders 'Awaiting registration application reference' text when not defined", () => {
      const $ = renderPage("summary-confirmation", {
        language: "cy",
        cumulativeFullAnswers: cumulativeFullAnswers,
        applicationCompletePage: true,
        fsaRegistrationNumber: undefined,
        lcConfig: lcConfigCombined,
        transformedData: transformedData
      });
      const $panel = $("#panelWithText");
      expect($panel.length).toBe(1);
    });
  });

  describe("When given a hygieneAndStandards phone number", () => {
    it("The paragraph renders displaying it", () => {
      const $ = renderPage("summary-confirmation", {
        language: "cy",
        cumulativeFullAnswers: cumulativeFullAnswers,
        applicationCompletePage: true,
        fsaRegistrationNumber: undefined,
        lcConfig: lcConfigCombined,
        transformedData: transformedData
      });

      const $hygieneAndStandardsNumber = $("#hygieneAndStandardsNumber");
      expect($hygieneAndStandardsNumber.length).toBe(1);
    });
  });

  describe("When given a hygiene phone number", () => {
    it("The paragraph renders displaying it", () => {
      const $ = renderPage("summary-confirmation", {
        language: "cy",
        cumulativeFullAnswers: cumulativeFullAnswers,
        applicationCompletePage: true,
        fsaRegistrationNumber: undefined,
        lcConfig: lcConfigSplit,
        transformedData: transformedData
      });
      const $hygienesNumber = $("#hygieneNumber");
      expect($hygienesNumber.length).toBe(1);
    });
  });

  describe("When given a standards phone number", () => {
    it("The paragraph renders displaying it", () => {
      const $ = renderPage("summary-confirmation", {
        language: "cy",
        cumulativeFullAnswers: cumulativeFullAnswers,
        applicationCompletePage: true,
        fsaRegistrationNumber: undefined,
        lcConfig: lcConfigSplit,
        transformedData: transformedData
      });
      const $standardsNumber = $("#standardsNumber");
      expect($standardsNumber.length).toBe(1);
    });

    describe("When given a contact representative email", () => {
      it("The paragraph renders displaying it", () => {
        const transformedDataRepresentative = {
          contact_representative_email: "rep@email.com",
          validatorErrors: {}
        };
        const $ = renderPage("summary-confirmation", {
          language: "cy",
          cumulativeFullAnswers: cumulativeFullAnswers,
          applicationCompletePage: true,
          fsaRegistrationNumber: "12345",
          lcConfig: lcConfigSplit,
          transformedData: transformedDataRepresentative
        });
        const $panel = $("#receiveConfirmationEmail-id");
        expect($panel.get(0).children[1].children[0].data.trim()).toBe("A copy of this registration has been sent to rep@email.com");
      });
    });

    describe("When not given a hygieneAndStandards phone number", () => {
      it("The hygieneAndStandards phone number does not render", () => {
        const $ = renderPage("summary-confirmation", {
          language: "cy",
          cumulativeFullAnswers: cumulativeFullAnswers,
          applicationCompletePage: true,
          fsaRegistrationNumber: undefined,
          lcConfig: lcConfigCombinedNoNumber,
          transformedData: transformedData
        });
  
        const $hygieneAndStandardsNumber = $("#hygieneAndStandardsNumber");
        expect($hygieneAndStandardsNumber.length).toBe(0);
      });
    });

    describe("When not given a hygiene phone number", () => {
      it("The hygiene phone number does not render", () => {
        const $ = renderPage("summary-confirmation", {
          language: "cy",
          cumulativeFullAnswers: cumulativeFullAnswers,
          applicationCompletePage: true,
          fsaRegistrationNumber: undefined,
          lcConfig: lcConfigSplitNoNumber,
          transformedData: transformedData
        });
        const $hygienesNumber = $("#hygieneNumber");
        expect($hygienesNumber.length).toBe(0);
      });
    });

    describe("When not given a standards phone number", () => {
      it("The standards phone number does not render", () => {
        const $ = renderPage("summary-confirmation", {
          language: "cy",
          cumulativeFullAnswers: cumulativeFullAnswers,
          applicationCompletePage: true,
          fsaRegistrationNumber: undefined,
          lcConfig: lcConfigSplitNoNumber,
          transformedData: transformedData
        });
        const $standardsNumber = $("#standardsNumber");
        expect($standardsNumber.length).toBe(0);
      });
    });

    describe("When given no lcConfig", () => {
      it("The page still renders", () => {
        const $ = renderPage("summary-confirmation", {
          language: "cy",
          cumulativeFullAnswers: cumulativeFullAnswers,
          applicationCompletePage: true,
          fsaRegistrationNumber: undefined,
          lcConfig: {},
          transformedData: transformedData
        });
        const $mainHeading = getPageDetails.getMainHeading($);
        expect($mainHeading.text().trim()).toEqual("Submission complete")
      });
    });

    describe("When council is Welsh", () => {
      it("should have Wales-specific content", () => {
        const $ = renderPage("summary-confirmation", {
          language: "cy",
          cumulativeFullAnswers: cumulativeFullAnswers,
          applicationCompletePage: true,
          lcConfig: lcConfigCombined,
          transformedData: transformedData,
          country:"wales"
        });
  
        const $businessGuidanceLink = $("#businessGuidanceLink");
        expect($businessGuidanceLink.length).toBe(1);
        expect($businessGuidanceLink.get(0).children[0].data.trim()).toBe(
          "Business support Wales"
        );
      });
    });

    describe("When council is Northern Irish", () => {
      it("should have Northern Ireland-specific content", () => {
        const $ = renderPage("summary-confirmation", {
          language: "en",
          cumulativeFullAnswers: cumulativeFullAnswers,
          applicationCompletePage: true,
          lcConfig: lcConfigCombined,
          transformedData: transformedData,
          country:"northern-ireland"
        });
  
        const $businessGuidanceLink = $("#businessGuidanceLink");
        expect($businessGuidanceLink.length).toBe(1);
        expect($businessGuidanceLink.get(0).children[0].data.trim()).toBe(
          "Business support Northern Ireland"
        );
      });
    });

    describe("When council is English", () => {
      it("should have England-specific content", () => {
        const $ = renderPage("summary-confirmation", {
          language: "en",
          cumulativeFullAnswers: cumulativeFullAnswers,
          applicationCompletePage: true,
          lcConfig: lcConfigCombined,
          transformedData: transformedData,
          country:"england"
        });
  
        const $businessGuidanceLink = $("#businessSupportHelplineEnglishLink");
        expect($businessGuidanceLink.length).toBe(1);
        expect($businessGuidanceLink.get(0).children[0].data.trim()).toBe(
          "Business support & helpline"
        );
      });
    });
  });


});
