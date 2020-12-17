import BrowserUnsupportedBanner from "../components/BrowserUnsupportedBanner";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests.js";

describe("<BrowserUnsupportedBanner />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BrowserUnsupportedBanner />);
    expect(wrapper.length).toBe(1);
  });
  it("shows warning text", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <BrowserUnsupportedBanner />
      </I18nextProvider>
    );
    const warningText = wrapper.find("WarningText");
    expect(warningText.length).toBe(1);
  });
});
