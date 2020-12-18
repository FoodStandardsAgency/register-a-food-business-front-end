import Index from "../pages/index";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

describe("<Index />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.length).toBe(1);
  });

  it("renders a BrowserUnsupportedBanner component if the browser is not supported", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Index isBrowserSupported={false} isBrowserVersionVerified={true} />
      </I18nextProvider>
    );
    const BrowserUnsupportedBanner = wrapper.find("BrowserUnsupportedBanner");
    expect(BrowserUnsupportedBanner.length).toBe(1);
  });
  it("does not render a BrowserUnsupportedBanner component if the browser is supported", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <Index isBrowserSupported={true} />
      </I18nextProvider>
    );
    const BrowserUnsupportedBanner = wrapper.find("BrowserUnsupportedBanner");
    expect(BrowserUnsupportedBanner.length).toBe(0);
  });
});
