import OperatorCompanyDetails from "./operator-company-details";
import { shallow, mount } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};
const testSwitches = {};

describe("<OperatorCompanyDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorCompanyDetails />);
    expect(wrapper.length).toBe(1);
  });

  describe("company name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorCompanyDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorCompanyName = wrapper.find(
        "InputField#operator_company_name"
      );
      expect(operatorCompanyName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_company_name: "test error"
      };
      const wrapper = mount(
        <OperatorCompanyDetails
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorCompanyName = wrapper.find(
        "InputField#operator_company_name"
      );
      expect(operatorCompanyName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_company_name: "default"
      };
      const wrapper = mount(
        <OperatorCompanyDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorCompanyName = wrapper.find(
        "InputField#operator_company_name"
      );
      expect(operatorCompanyName.props().input.defaultValue).toBe("default");
    });
  });

  describe("Companies House reference number input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorCompanyDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorCompaniesHouseNumber = wrapper.find(
        "InputField#operator_company_house_number"
      );
      expect(operatorCompaniesHouseNumber.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_company_house_number: "test error"
      };
      const wrapper = mount(
        <OperatorCompanyDetails
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorCompaniesHouseNumber = wrapper.find(
        "InputField#operator_company_house_number"
      );
      expect(operatorCompaniesHouseNumber.props().meta.error).toBe(
        "test error"
      );
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_company_house_number: "default"
      };
      const wrapper = mount(
        <OperatorCompanyDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorCompaniesHouseNumber = wrapper.find(
        "InputField#operator_company_house_number"
      );
      expect(operatorCompaniesHouseNumber.props().input.defaultValue).toBe(
        "default"
      );
    });
  });
});
