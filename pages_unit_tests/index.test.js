import Index from "../pages/index";
import { shallow, mount } from "enzyme";

describe("<Index />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Index />);
    expect(wrapper.length).toBe(1);
  });

  it("renders a BrowserUnsupportedBanner component if the browser is not supported", () => {
    const wrapper = mount(
      <Index isBrowserSupported={false} isBrowserVersionVerified={true} />
    );
    const BrowserUnsupportedBanner = wrapper.find("BrowserUnsupportedBanner");
    expect(BrowserUnsupportedBanner.length).toBe(1);
  });
  it("does not render a BrowserUnsupportedBanner component if the browser is supported", () => {
    const wrapper = mount(<Index isBrowserSupported={true} />);
    const BrowserUnsupportedBanner = wrapper.find("BrowserUnsupportedBanner");
    expect(BrowserUnsupportedBanner.length).toBe(0);
  });
});
