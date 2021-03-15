import OperatorAddress from "../pages/operator-address";
import { mount, shallow } from "enzyme";
import { HintText, Heading } from "@slice-and-dice/govuk-react";
import { Paragraph } from "@slice-and-dice/govuk-react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

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
      const cumulativeAnswers = { registration_role: "PARTNERSHIP" };
      wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorAddress
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
    });

    it("renders correct header", () => {
      const header = wrapper.find(Heading);
      expect(header.at(1).text()).toBe(
        "What is the partnership contact's postcode?"
      );
    });

    it("renders correct hint text", () => {
      const hintText = wrapper.find(HintText);
      expect(hintText.first().props().children).toBe(
        "Partnership address is the contact address for the partner who is the main point of contact."
      );
    });
  });
  describe("when registration role is not partnership", () => {
    let wrapper;
    beforeEach(() => {
      const cumulativeAnswers = { registration_role: "TEST" };
      wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorAddress
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
    });

    it("renders correct header", () => {
      const header = wrapper.find(Heading);
      expect(header.at(1).props().children).toBe("What is the operator's postcode?");
    });

    it("renders correct hint text", () => {
      const hintText = wrapper.find(HintText);
      expect(hintText.first().props().children).toBe(
        "Operator address is the contact address for the operator. For example home address for a sole trader or headquarters address for a limited company."
      );
    });

    it("renders correct hidden text", () => {
      const hiddenText = wrapper.find(Paragraph);
      expect(hiddenText.at(1).props().children).toBe(
        "The operator is the person or people, charity or company who makes the decisions about the food business. They decide what it serves and how it operates."
      );
    });
  });
  describe("Operator postcode input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorAddress
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
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
