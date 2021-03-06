import ContactRepresentative from "../pages/contact-representative";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<ContactRepresentative />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ContactRepresentative />);
    expect(wrapper.length).toBe(1);
  });

  describe("Contact representative name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeName = wrapper.find(
        "InputField#contact_representative_name"
      );
      expect(contactRepresentativeName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        contact_representative_name: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeName = wrapper.find(
        "InputField#contact_representative_name"
      );
      expect(contactRepresentativeName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        contact_representative_name: "default"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeName = wrapper.find(
        "InputField#contact_representative_name"
      );
      expect(contactRepresentativeName.props().input.defaultValue).toBe(
        "default"
      );
    });
  });

  describe("Contact representative role input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeRole = wrapper.find(
        "InputField#contact_representative_role"
      );
      expect(contactRepresentativeRole.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        contact_representative_role: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeRole = wrapper.find(
        "InputField#contact_representative_role"
      );
      expect(contactRepresentativeRole.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        contact_representative_role: "default"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeRole = wrapper.find(
        "InputField#contact_representative_role"
      );
      expect(contactRepresentativeRole.props().input.defaultValue).toBe(
        "default"
      );
    });
  });

  describe("Contact representative email input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeEmail = wrapper.find(
        "InputField#contact_representative_email"
      );
      expect(contactRepresentativeEmail.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        contact_representative_email: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeEmail = wrapper.find(
        "InputField#contact_representative_email"
      );
      expect(contactRepresentativeEmail.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        contact_representative_email: "default"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeEmail = wrapper.find(
        "InputField#contact_representative_email"
      );
      expect(contactRepresentativeEmail.props().input.defaultValue).toBe(
        "default"
      );
    });
  });

  describe("Contact representative phone number input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeNumber = wrapper.find(
        "InputField#contact_representative_number"
      );
      expect(contactRepresentativeNumber.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        contact_representative_number: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeNumber = wrapper.find(
        "InputField#contact_representative_number"
      );
      expect(contactRepresentativeNumber.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        contact_representative_number: "default"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <ContactRepresentative
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const contactRepresentativeNumber = wrapper.find(
        "InputField#contact_representative_number"
      );
      expect(contactRepresentativeNumber.props().input.defaultValue).toBe(
        "default"
      );
    });
  });
});
