import BusinessType from "../pages/business-type";
import { shallow, mount } from "enzyme";
import {act} from 'react-dom/test-utils'; // ES6


describe("<BusinessType />", () => {
  let wrapper;
  it("renders without crashing", async () => {
    await act(async() => {
      wrapper = shallow(<BusinessType />)
    });
    expect(wrapper.length).toBe(1);
  });

  it("renders a BusinessTypeLookup component and passes through the props", async () => {
    await act(async() => {
     wrapper = mount(
      <BusinessType
        validatorErrors={{}}
        cumulativeFullAnswers={{}}
        exampleProp="testing"
      />
    );
    });

    const businessTypeLookup = wrapper.find("BusinessTypeLookup");
    expect(businessTypeLookup.length).toBe(1);
    expect(businessTypeLookup.props().exampleProp).toBe("testing");
  });
});
