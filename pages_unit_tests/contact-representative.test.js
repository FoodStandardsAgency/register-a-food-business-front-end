/**
 * @jest-environment jsdom
 */

const { axe, renderPage, getPageDetails } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    contact_representative_name: "default",
    contact_representative_role: "default",
    contact_representative_number: "default",
    contact_representative_email: "default"
  },
  language: "en"
};

describe("contact-representative", () => {
  it("renders without crashing", () => {
    const $ = renderPage("contact-representative", props);

    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual("Contact representative details");
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("contact-representative", props);

    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("contact representative name input field", () => {
    it("contact representative name input field", async () => {
      const $ = renderPage("contact-representative", props);
      const $inputBox = $("#contact_representative_name");
      expect($inputBox.length).toBe(1);
    });

    it("gets given the correct default value", () => {
      const $ = renderPage("contact-representative", props);

      const $inputBox = $("#contact_representative_name");
      expect($inputBox.get(0).attribs.value).toBe("default");
    });
  });

  describe("contact representative input field", () => {
    it("renders", async () => {
      const $ = renderPage("contact-representative", props);
      const $inputBox = $("#contact_representative_role");
      expect($inputBox.length).toBe(1);
    });

    it("gets given the correct default value", () => {
      const $ = renderPage("contact-representative", props);

      const $inputBox = $("#contact_representative_role");
      expect($inputBox.get(0).attribs.value).toBe("default");
    });
  });
  describe("contact representative input field", () => {
    it("renders", async () => {
      const $ = renderPage("contact-representative", props);
      const $inputBox = $("#contact_representative_number");
      expect($inputBox.length).toBe(1);
    });

    it("gets given the correct default value", () => {
      const $ = renderPage("contact-representative", props);

      const $inputBox = $("#contact_representative_number");
      expect($inputBox.get(0).attribs.value).toBe("default");
    });
  });

  describe("contact representative input field", () => {
    it("renders", async () => {
      const $ = renderPage("contact-representative", props);
      const $inputBox = $("#contact_representative_email");
      expect($inputBox.length).toBe(1);
    });

    it("gets given the correct default value", () => {
      const $ = renderPage("contact-representative", props);

      const $inputBox = $("#contact_representative_email");
      expect($inputBox.get(0).attribs.value).toBe("default");
    });
  });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("contact-representative", {
        language: "cy",
        validatorErrors: {
          contact_representative_name: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("contact-representative", {
        language: "cy",
        validatorErrors: {
          contact_representative_name: "test error"
        }
      });

      const $inputError = $("#contact_representative_name-error");
      expect($inputError.length).toBe(1);
      expect($inputError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});
