const { axe, renderPage } = require("../testHelpers");

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: {
    operator_first_name: "test name1",
    operator_last_name: "test name2"
  },
  language: "en"
};

describe("Operator-Name", () => {
  it("It should pass accessibility tests", async () => {
    const $ = renderPage("operator-name", "language: 'en'");
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  it("renders without crashing", () => {
    const $ = renderPage("operator-name", props);

    const $mainHeading = $("h1");
    expect($mainHeading.text().trim()).toEqual("What is the operator's name?");
  });

  describe("It should have correct input fields", () => {
    it("renders operator first name correctly", () => {
      const $ = renderPage("operator-name", props);
      const $firstname = $("#operator_first_name");
      expect($firstname.get(0).attribs.name).toBe("operator_first_name");
    });

    it("renders operator last name correctly", () => {
      const $ = renderPage("operator-name", "language: 'en'");
      const $ = renderPage("establishment-address-type", props);
      const $firstname = $("#operator_last_name");
      expect($firstname.get(0).attribs.name).toBe("operator_last_name");
    });
  });

  it("renders the correct error", async () => {
    const $ = renderPage("operator-name", {
      language: "cy",
      validatorErrors: {
        operator_first_name: "test name1",
        operator_last_name: "test name2"
      }
    });

    const $pageErrors = $(".govuk-error-summary__list a");
    expect($pageErrors.length).toBe(2);
    expect($pageErrors.contents().get(0).data).toBe("test name1");
    expect($pageErrors.contents().get(1).data).toBe("test name2");
  });
});
