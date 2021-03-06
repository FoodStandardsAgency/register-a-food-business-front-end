import OperatorContactDetails from "../pages/operator-contact-details";
import { shallow, mount } from "enzyme";
import { HintText } from "@slice-and-dice/govuk-react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};
const testSwitches = {};

describe("<OperatorContactDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorContactDetails />);
    expect(wrapper.length).toBe(1);
  });

  describe("when registration role is partnership", () => {
    it("renders with correct hint text", () => {
      const cumulativeAnswers = { registration_role: "PARTNERSHIP" };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorContactDetails
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const hintText = wrapper.find(HintText);
      expect(hintText.first().props().children).toBe(
        "Contact details for the main point of contact for this business"
      );
    });
  });

  describe("operator primary phone number input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorContactDetails
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const operatorPrimaryContact = wrapper.find(
        "InputField#operator_primary_number"
      );
      expect(operatorPrimaryContact.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_primary_number: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorContactDetails
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const operatorPrimaryContact = wrapper.find(
        "InputField#operator_primary_number"
      );
      expect(operatorPrimaryContact.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_primary_number: "default"
      };
      const wrapper = mount(
        <OperatorContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorPrimaryContact = wrapper.find(
        "InputField#operator_primary_number"
      );
      expect(operatorPrimaryContact.props().input.defaultValue).toBe("default");
    });
  });

  describe("operator secondary contact details input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorSecondaryContact = wrapper.find(
        "InputField#operator_secondary_number"
      );
      expect(operatorSecondaryContact.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_secondary_number: "test error"
      };
      const wrapper = mount(
        <OperatorContactDetails
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorSecondaryContact = wrapper.find(
        "InputField#operator_secondary_number"
      );
      expect(operatorSecondaryContact.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_secondary_number: "default"
      };
      const wrapper = mount(
        <OperatorContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorSecondaryContact = wrapper.find(
        "InputField#operator_secondary_number"
      );
      expect(operatorSecondaryContact.props().input.defaultValue).toBe(
        "default"
      );
    });
  });

  describe("operator email input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorEmail = wrapper.find("InputField#operator_email");
      expect(operatorEmail.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_email: "test error"
      };
      const wrapper = mount(
        <OperatorContactDetails
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorEmail = wrapper.find("InputField#operator_email");
      expect(operatorEmail.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_email: "default"
      };
      const wrapper = mount(
        <OperatorContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorEmail = wrapper.find("InputField#operator_email");
      expect(operatorEmail.props().input.defaultValue).toBe("default");
    });
  });
});
