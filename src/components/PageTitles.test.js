import { PageTitles } from "../components";
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";

const testValidatorErrors = {};

const testValidatorErrorsPopulated = { test: "test" };

const testAllValidationErrors = {};

describe("PageTitles", () => {
  const cumulativeFullAnswers = {};
  it("returns the default error title when URL not recognised when validator errors is populated", () => {
    const title = PageTitles.getUrlPageTitle(
      "not/recognised",
      testValidatorErrorsPopulated,
      testAllValidationErrors,
      cumulativeFullAnswers
    );
    expect(title).toBe(`Error ${PageTitles.defaultPageTitle}`);
  });

  it("returns the default title when URL not recognised", () => {
    const title = PageTitles.getUrlPageTitle(
      "not/recognised",
      testValidatorErrors,
      testAllValidationErrors,
      cumulativeFullAnswers
    );
    expect(title).toBe(PageTitles.defaultPageTitle);
  });

  it("returns the default error title when URL empty when validator errors is populated", () => {
    const title = PageTitles.getUrlPageTitle(
      "/",
      testValidatorErrorsPopulated,
      testAllValidationErrors,
      cumulativeFullAnswers
    );
    expect(title).toBe(`Error ${PageTitles.defaultPageTitle}`);
  });

  it("returns the default title when URL empty", () => {
    const title = PageTitles.getUrlPageTitle(
      "/",
      testValidatorErrors,
      testAllValidationErrors,
      cumulativeFullAnswers
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
      testAllValidationErrors,
      cumulativeFullAnswers
    );
    expect(title).toBe(
      `${PageTitles.prefix} - ${PageTitles.pageTitles[page](
        cumulativeFullAnswers
      )}`
    );
  });

  describe("registration role dependent page titles", () => {
    it("returns partnership variation of operator-address page title when registration role is partnership", () => {
      const page = "operator-address";
      const cumulativeFullAnswers = {
        registration_role: operatorTypeEnum.PARTNERSHIP.key
      };
      const title = PageTitles.getUrlPageTitle(
        `new/council/${page}`,
        testValidatorErrors,
        testAllValidationErrors,
        cumulativeFullAnswers
      );
      expect(title).toBe(
        "Register a Food Business - What is the partnership contact's postcode?"
      );
    });
    it("returns operator variation of operator-address page title when registration role is not partnership", () => {
      const page = "operator-address";
      const cumulativeFullAnswers = {
        registration_role: operatorTypeEnum.SOLETRADER.key
      };
      const title = PageTitles.getUrlPageTitle(
        `new/council/${page}`,
        testValidatorErrors,
        testAllValidationErrors,
        cumulativeFullAnswers
      );
      expect(title).toBe(
        "Register a Food Business - What is the operator's postcode?"
      );
    });
  });
});
