import { PageTitles } from "../components";

const testValidatorErrors = {};

const testAllValidationErrors = {};

describe("PageTitles", () => {
  it("returns the default title when URL not recognised", () => {
    const title = PageTitles.getUrlPageTitle(
      "not/recognised",
      testValidatorErrors,
      testAllValidationErrors
    );
    expect(title).toBe(PageTitles.defaultPageTitle);
  });

  it("returns the default title when URL empty", () => {
    const title = PageTitles.getUrlPageTitle(
      "/",
      testValidatorErrors,
      testAllValidationErrors
    );
    expect(title).toBe(PageTitles.defaultPageTitle);
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
