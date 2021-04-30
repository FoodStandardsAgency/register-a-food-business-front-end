const index = require("../pages/index.njk");
const { render } = require("../testHelpers")

describe("Index", () => {
  it("renders without crashing", () => {
    const $ = render("index", "testString: 'test'");
    
    const $mainHeading = $('#main-heading')
    expect($mainHeading.get(0).tagName).toEqual('h1')
  });

  // it("renders a BrowserUnsupportedBanner component if the browser is not supported", () => {
  //   const wrapper = mount(
  //     <I18nextProvider i18n={i18n}>
  //       <Index isBrowserSupported={false} isBrowserVersionVerified={true} />
  //     </I18nextProvider>
  //   );
  //   const BrowserUnsupportedBanner = wrapper.find("BrowserUnsupportedBanner");
  //   expect(BrowserUnsupportedBanner.length).toBe(1);
  // });
  // it("does not render a BrowserUnsupportedBanner component if the browser is supported", () => {
  //   const wrapper = mount(
  //     <I18nextProvider i18n={i18n}>
  //       <Index isBrowserSupported={true} />
  //     </I18nextProvider>
  //   );
  //   const BrowserUnsupportedBanner = wrapper.find("BrowserUnsupportedBanner");
  //   expect(BrowserUnsupportedBanner.length).toBe(0);
  // });
});
