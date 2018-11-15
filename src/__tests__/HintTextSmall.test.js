import HintTextSmall from "../components/HintTextSmall";
import { shallow } from "enzyme";

describe("<HintTextSmall  />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<HintTextSmall>"It works"</HintTextSmall>);
    expect(wrapper.length).toBe(1);
  });
});
