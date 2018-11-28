import BusinessType from "../pages/business-type";
import { shallow, mount } from "enzyme";

describe("<BusinessType />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BusinessType />);
    expect(wrapper.length).toBe(1);
  });

  it("renders a BusinessTypeLookup component and passes through the props", () => {
    const wrapper = mount(
      <BusinessType
        validatorErrors={{}}
        cumulativeFullAnswers={{}}
        exampleProp="testing"
      />
    );
    const businessTypeLookup = wrapper.find("BusinessTypeLookup");
    expect(businessTypeLookup.length).toBe(1);
    expect(businessTypeLookup.props().exampleProp).toBe("testing");
  });
});
