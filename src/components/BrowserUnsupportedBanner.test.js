import BrowserUnsupportedBanner from "../components/BrowserUnsupportedBanner";
import { shallow, mount } from "enzyme";

describe("<BrowserUnsupportedBanner />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BrowserUnsupportedBanner />);
    expect(wrapper.length).toBe(1);
  });

  it("shows nothing when supported browser is true", () => {
    const wrapper = mount(<BrowserUnsupportedBanner supportedBrowser={true} />);
    const warningText = wrapper.find("WarningText");
    expect(warningText.length).toBe(0);
  });

  it("shows warning text when supported browser is false", () => {
    const wrapper = mount(
      <BrowserUnsupportedBanner supportedBrowser={false} />
    );
    const warningText = wrapper.find("WarningText");
    expect(warningText.length).toBe(1);
  });
});
