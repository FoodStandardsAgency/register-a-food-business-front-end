import BusinessType from "../../pages/business-type";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<BusinessType />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BusinessType />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(<BusinessType validatorErrors cumulativeAnswers />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders a BusinessTypeLookup component and passes through the props", () => {
    const wrapper = mount(
      <BusinessType validatorErrors cumulativeAnswers exampleProp="testing" />
    );
    const businessTypeLookup = wrapper.find("BusinessTypeLookup");
    expect(businessTypeLookup.length).toBe(1);
    expect(businessTypeLookup.props().exampleProp).toBe("testing");
  });
});
