import OperatorAddress from "../pages/operator-address";
import { mount, shallow } from "enzyme";
import { HintText, Header } from "govuk-react";
import { Paragraph } from "govuk-react";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<OperatorAddress />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorAddress />);
    expect(wrapper.length).toBe(1);
  });

  describe("when registration role is partnership", () => {
    let wrapper;
    beforeEach(() => {
      const cumulativeAnswers = { registration_role: "Partnership" };
      wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
    });

    it("renders correct header", () => {
      const header = wrapper.find(Header);
      expect(header.at(1).props().children).toBe(
        "What is the partnership contact's address?"
      );
    });

    it("renders correct hint text", () => {
      const hintText = wrapper.find(HintText);
      expect(hintText.first().props().children).toBe(
        "Partnership address is the contact address for the partner who is the main point of contact."
      );
    });

    it("renders correct hidden text", () => {
      const hiddenText = wrapper.find(Paragraph);
      expect(hiddenText.at(1).props().children).toBe(
        "In a partnership, you and your partner (or partners) personally share responsibility for your food business"
      );
    });
  });
  describe("Operator postcode input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorPostcode = wrapper.find(
        "InputField#operatorPostcodeFindComponent"
      );
      expect(operatorPostcode.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_postcode_find: "test error"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorPostcode = wrapper.find(
        "InputField#operatorPostcodeFindComponent"
      );
      expect(operatorPostcode.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_postcode_find: "default"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorPostcode = wrapper.find(
        "InputField#operatorPostcodeFindComponent"
      );
      expect(operatorPostcode.props().input.defaultValue).toBe("default");
    });
  });
});
