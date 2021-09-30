const OperatorName = require("../pages/operator-name.njk");
const { axe, renderPage } = require("../testHelpers");

describe("Page heading title should be 'What is the operator's name ?'", () => {
  it("renders without crashing", () => {
    const $ = renderPage("operator-name", "language: 'en'");
    const test = expect.stringContaining("What is the operator's name ?");
  });

  it("It should pass accessibility tests", async () => {
    const $ = renderPage("operator-name", "language: 'en'");
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  describe("It should have operator first name input field", () => {
    it("renders", () => {
      const $ = renderPage("operator-name", "language: 'en'");
      const $firstname = $("#operator_first_name");
      expect($firstname.get(0).attribs.name).toBe("operator_first_name");
    });
  });

  describe("It should have operator last name input field", () => {
    it("renders", () => {
      const $ = renderPage("operator-name", "language: 'en'");
      const $firstname = $("#operator_last_name");
      expect($firstname.get(0).attribs.name).toBe("operator_last_name");
    });
  });
});
