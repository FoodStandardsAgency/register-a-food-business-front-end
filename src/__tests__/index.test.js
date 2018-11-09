import Index from "../../pages/index";
import { mount } from "enzyme";

describe("<Index />", () => {
  it("renders without crashing", () => {
    const wrapper = mount(<Index />);
    expect(wrapper.length).toBe(1);
  });
});
