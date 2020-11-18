import EstablishmentContactDetails from "../pages/establishment-contact-details";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer",
  registration_role: "Operator"
};

const testSwitches = {
  example: true
};

describe("<EstablishmentContactDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentContactDetails />);
    expect(wrapper.length).toBe(1);
  });

  describe("establishmentprimary phone number input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentPrimaryContact = wrapper.find(
        "InputField#establishment_primary_number"
      );
      expect(establishmentPrimaryContact.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_primary_number: "test error"
      };
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentPrimaryContact = wrapper.find(
        "InputField#establishment_primary_number"
      );
      expect(establishmentPrimaryContact.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value when reuseOperatorContactDetails switch is true ", () => {
      const testSwitches = {
        reuseOperatorContactDetails: true
      };
      const cumulativeFullAnswers = {
        operator_primary_number: "operator primary number",
        establishment_primary_number: "establishment primary number",
        registration_role: "Partnership"
      };

      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const establishmentSecondaryNumber = wrapper.find(
        "InputField#establishment_primary_number"
      );
      expect(establishmentSecondaryNumber.props().input.defaultValue).toBe(
        "operator primary number"
      );
    });

    it("gets given the correct default value reuseOperatorContactDetails switch is false", () => {
      const testSwitches = {
        reuseOperatorContactDetails: false
      };
      const cumulativeFullAnswers = {
        establishment_primary_number: "establishment primary number",
        operator_primary_number: "operator primary number",
        registration_role: "Partnership"
      };

      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const establishmentSecondaryNumber = wrapper.find(
        "InputField#establishment_primary_number"
      );
      expect(establishmentSecondaryNumber.props().input.defaultValue).toBe(
        "establishment primary number"
      );
    });
  });

  describe("establishment secondary contact details input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentSecondaryContact = wrapper.find(
        "InputField#establishment_secondary_number"
      );
      expect(establishmentSecondaryContact.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_secondary_number: "test error"
      };
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentSecondaryContact = wrapper.find(
        "InputField#establishment_secondary_number"
      );
      expect(establishmentSecondaryContact.props().meta.error).toBe(
        "test error"
      );
    });

    it("gets given the correct default value when reuseOperatorContactDetails switch is true ", () => {
      const testSwitches = {
        reuseOperatorContactDetails: true
      };
      const cumulativeFullAnswers = {
        operator_secondary_number: "operator secondary number",
        establishment_secondary_number: "establishment secondary number",
        registration_role: "Partnership"
      };

      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const establishmentSecondaryNumber = wrapper.find(
        "InputField#establishment_secondary_number"
      );
      expect(establishmentSecondaryNumber.props().input.defaultValue).toBe(
        "operator secondary number"
      );
    });

    it("gets given the correct default value reuseOperatorContactDetails switch is false", () => {
      const testSwitches = {
        reuseOperatorContactDetails: false
      };
      const cumulativeFullAnswers = {
        establishment_secondary_number: "establishment secondary number",
        operator_secondary_number: "operator secondary number",
        registration_role: "Partnership"
      };

      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const establishmentSecondaryNumber = wrapper.find(
        "InputField#establishment_secondary_number"
      );
      expect(establishmentSecondaryNumber.props().input.defaultValue).toBe(
        "establishment secondary number"
      );
    });
  });

  describe("establishment email input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentEmail = wrapper.find("InputField#establishment_email");
      expect(establishmentEmail.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_email: "test error"
      };
      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentEmail = wrapper.find("InputField#establishment_email");
      expect(establishmentEmail.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value when reuseOperatorContactDetails switch is true ", () => {
      const testSwitches = {
        reuseOperatorContactDetails: true
      };
      const cumulativeFullAnswers = {
        operator_email: "operator email",
        establishment_email: "establishment email",
        registration_role: "Partnership"
      };

      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const establishmentEmail = wrapper.find("InputField#establishment_email");
      expect(establishmentEmail.props().input.defaultValue).toBe(
        "operator email"
      );
    });

    it("gets given the correct default value reuseOperatorContactDetails switch is false", () => {
      const testSwitches = {
        reuseOperatorContactDetails: false
      };
      const cumulativeFullAnswers = {
        establishment_email: "establishment email",
        operator_email: "operator email",
        registration_role: "Partnership"
      };

      const wrapper = mount(
        <EstablishmentContactDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const establishmentEmail = wrapper.find("InputField#establishment_email");
      expect(establishmentEmail.props().input.defaultValue).toBe(
        "establishment email"
      );
    });
  });
});
