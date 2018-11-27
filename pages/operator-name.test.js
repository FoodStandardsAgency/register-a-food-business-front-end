import OperatorName from "./operator-name";
import { shallow, mount } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<OperatorName />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorName />);
    expect(wrapper.length).toBe(1);
  });

  describe("operator first name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorName
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorFirstName = wrapper.find("InputField#operator_first_name");
      expect(operatorFirstName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_first_name: "test error"
      };
      const wrapper = mount(
        <OperatorName
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorFirstName = wrapper.find("InputField#operator_first_name");
      expect(operatorFirstName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_first_name: "default"
      };
      const wrapper = mount(
        <OperatorName
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorFirstName = wrapper.find("InputField#operator_first_name");
      expect(operatorFirstName.props().input.defaultValue).toBe("default");
    });
  });

  describe("operator last name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorName
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorLastName = wrapper.find("InputField#operator_last_name");
      expect(operatorLastName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_last_name: "test error"
      };
      const wrapper = mount(
        <OperatorName
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorLastName = wrapper.find("InputField#operator_last_name");
      expect(operatorLastName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_last_name: "default"
      };
      const wrapper = mount(
        <OperatorName
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorLastName = wrapper.find("InputField#operator_last_name");
      expect(operatorLastName.props().input.defaultValue).toBe("default");
    });
  });
});
