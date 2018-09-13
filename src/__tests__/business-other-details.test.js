import OtherDetails from "../../pages/business-other-details";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<OtherDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OtherDetails />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <OtherDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("other details input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OtherDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      console.log(wrapper.debug());
      const businessOtherDetails = wrapper.find(
        "textarea#business_other_details"
      );
      expect(businessOtherDetails.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        business_other_details: "test error"
      };
      const wrapper = mount(
        <OtherDetails
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const businessOtherDetails = wrapper.find(
        "textarea#business_other_details"
      );
      expect(businessOtherDetails.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        business_other_details: "default"
      };
      const wrapper = mount(
        <OtherDetails
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const businessOtherDetails = wrapper.find(
        "textarea#business_other_details"
      );
      expect(businessOtherDetails.props().input.defaultValue).toBe("default");
    });
  });
});
