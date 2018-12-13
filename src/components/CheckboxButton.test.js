import CheckboxButton from "../components/CheckboxButton";
import { shallow } from "enzyme";

describe("<Checkbox />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<CheckboxButton />);
    expect(wrapper.length).toBe(1);
  });
});
