import CustomerType from "../pages/customer-type";
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

describe("<CustomerType />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<CustomerType />);
    expect(wrapper.length).toBe(1);
  });

  describe("renders 2 checkboxes with correct error props and default values", () => {
    it("renders 2 checkboxes", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <CustomerType
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const customerTypeCheckBox = wrapper.find("Checkbox");
      expect(customerTypeCheckBox.length).toBe(2);
    });

    it("supply_directly checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        supply_directly: "default"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <CustomerType
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const customerTypeCheckBox = wrapper.find(
        "Checkbox#customer_type_supply_directly"
      );
      expect(customerTypeCheckBox.props().defaultChecked).toBe("default");
    });

    it("supply_other checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        supply_other: "default"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <CustomerType
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const customerTypeCheckBox = wrapper.find(
        "Checkbox#customer_type_supply_other"
      );
      expect(customerTypeCheckBox.props().defaultChecked).toBe("default");
    });
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        customer_type: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <CustomerType
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const customerType = wrapper.find("MultiChoice");
      expect(customerType.props().meta.error).toBe("test error");
    });
  });
});
