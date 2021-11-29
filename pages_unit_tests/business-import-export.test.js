const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { directly_export: "EXPORT" },
  language: "en"
};

describe("business-import-export", () => {
  it("renders without crashing", () => {
    const $ = renderPage("business-import-export", props);
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "Will this food business import or export any food from outside the UK?"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("business-import-export", props);
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders 3 radio boxes buttons", async () => {
    const $ = renderPage("business-import-export", props);
    const $business_import_exportChecklist = getPageDetails.getCheckboxes($);
    expect($business_import_exportChecklist.length).toBe(3);
  });

  describe("Radio boxes have correct value", () => {
    it("renders the Import radio button with the correct value", () => {
      const $ = renderPage("business-import-export", props);
      const $mainHeadingImport = $("#import_export_activities_directly_import");
      expect($mainHeadingImport.get(0).attribs.value).toBe("IMPORT");
    });
    
    it("renders the Export radio button with the correct value", () => {
      const $ = renderPage("business-import-export", props);
      const $mainHeadingExport = $("#import_export_activities_directly_export");
      expect($mainHeadingExport.get(0).attribs.value).toBe("EXPORT");
    });
    it("renders the none radio button with the correct value", () => {
      const $ = renderPage("business-import-export", props);
      const $mainHeadingNone = $("#import_export_activities_none");
      expect($mainHeadingNone.get(0).attribs.value).toBe("NONE");
    });
    it("select the Irregular days radio button based on session data", () => {
      const $ = renderPage("business-import-export", props);
      const $selected = $("input:checked");
      expect($selected.get(0).attribs.value).toBe("EXPORT");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("business-import-export", {
        language: "cy",
        validatorErrors: {
          business_import_export: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("business-import-export", {
        language: "cy",
        validatorErrors: {
          business_import_export: "test error"
        }
      });

      const $checkError = $("#business_import_export-error");
      expect($checkError.length).toBe(1);
      expect($checkError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});