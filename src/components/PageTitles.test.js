import { PageTitles } from "../components";

const testValidatorErrors = {};

const testValidatorErrorsPopulated = { test: "test" };

const testAllValidationErrors = {};

describe("PageTitles", () => {
  it("returns the default error title when URL not recognised when validator errors is populated", () => {
    const title = PageTitles.getUrlPageTitle(
      "not/recognised",
      testValidatorErrorsPopulated,
      testAllValidationErrors
    );
    expect(title).toBe(`Error ${PageTitles.defaultPageTitle}`);
  });

  it("returns the default title when URL not recognised", () => {
    const title = PageTitles.getUrlPageTitle(
      "not/recognised",
      testValidatorErrors,
      testAllValidationErrors
    );
    expect(title).toBe(PageTitles.defaultPageTitle);
  });

  it("returns the default error title when URL empty when validator errors is populated", () => {
    const title = PageTitles.getUrlPageTitle(
      "/",
      testValidatorErrorsPopulated,
      testAllValidationErrors
    );
    expect(title).toBe(`Error ${PageTitles.defaultPageTitle}`);
  });

  it("returns the default title when URL empty", () => {
    const title = PageTitles.getUrlPageTitle(
      "/",
      testValidatorErrors,
      testAllValidationErrors
    );
    expect(title).toBe(PageTitles.defaultPageTitle);
  });

  it("returns the relevant error page title with prefix for URL when validator errors is populated", () => {
    const page = "business-type";
    const title = PageTitles.getUrlPageTitle(
      `new/council/${page}`,
      testValidatorErrorsPopulated,
      testAllValidationErrors
    );
    expect(title).toBe(
      `Error ${PageTitles.prefix} - ${PageTitles.pageTitles[page]}`
    );
  });

  it("returns the relevant page title with prefix for URL", () => {
    const page = "business-type";
    const title = PageTitles.getUrlPageTitle(
      `new/council/${page}`,
      testValidatorErrors,
      testAllValidationErrors
    );
    expect(title).toBe(`${PageTitles.prefix} - ${PageTitles.pageTitles[page]}`);
  });
});
