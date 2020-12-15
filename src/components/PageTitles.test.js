import { PageTitles } from "../components";

describe("PageTitles", () => {
  it("returns the default title when URL not recognised", () => {
    const title = PageTitles.getUrlPageTitle("not/recognised", "en");
    expect(title).toBe(PageTitles.defaultPageTitle);
  });

  it("returns the default title when URL empty", () => {
    const title = PageTitles.getUrlPageTitle("/", "en");
    expect(title).toBe(PageTitles.defaultPageTitle);
  });

  it("returns the relevant page title with prefix for URL", () => {
    const page = "business-type";
    const title = PageTitles.getUrlPageTitle(`new/council/${page}`, "en");
    expect(title).toBe(`${PageTitles.prefix} - ${PageTitles.pageTitles[page]}`);
  });
});
