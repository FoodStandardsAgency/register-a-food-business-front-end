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
    const wrapper = mount(<BrowserUnsupportedBanner />);
    const warningText = wrapper.find("WarningText");
    expect(warningText.length).toBe(1);
  });
});
