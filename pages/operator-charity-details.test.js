import OperatorCharityDetails from "./operator-charity-details";
import { shallow, mount } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<OperatorCharityDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorCharityDetails />);
    expect(wrapper.length).toBe(1);
  });

  describe("charity name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorCharityName = wrapper.find(
        "InputField#operator_charity_name"
      );
      expect(operatorCharityName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_charity_name: "test error"
      };
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorCharityName = wrapper.find(
        "InputField#operator_charity_name"
      );
      expect(operatorCharityName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_charity_name: "default"
      };
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorCharityName = wrapper.find(
        "InputField#operator_charity_name"
      );
      expect(operatorCharityName.props().input.defaultValue).toBe("default");
    });
  });

  describe("charity reference number input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorCharityNumber = wrapper.find(
        "InputField#operator_charity_number"
      );
      expect(operatorCharityNumber.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_charity_number: "test error"
      };
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorCharityNumber = wrapper.find(
        "InputField#operator_charity_number"
      );
      expect(operatorCharityNumber.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_charity_number: "default"
      };
      const wrapper = mount(
        <OperatorCharityDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorCharityNumber = wrapper.find(
        "InputField#operator_charity_number"
      );
      expect(operatorCharityNumber.props().input.defaultValue).toBe("default");
    });
  });
});
