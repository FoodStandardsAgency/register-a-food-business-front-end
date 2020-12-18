import OperatorType from "../pages/operator-type";
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

describe("<OperatorType />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorType />);
    expect(wrapper.length).toBe(1);
  });

  it("renders 3 radio buttons with correct error props and default values", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <OperatorType
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      </I18nextProvider>
    );
    const operatorTypeRadio = wrapper.find("Radio");
    expect(operatorTypeRadio.length).toBe(3);
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        operator_type: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorType
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const operatorType = wrapper.find("MultiChoice");
      expect(operatorType.props().meta.error).toBe("test error");
    });
  });

  describe("all Radio buttons", () => {
    it("can be selected by default", () => {
      const radioButtonIdsAndValues = {
        operator_type_person: "PERSON",
        operator_type_company: "COMPANY",
        operator_type_charity: "CHARITY"
      };

      for (let radioButtonId in radioButtonIdsAndValues) {
        const cumulativeFullAnswers = {
          operator_type: radioButtonIdsAndValues[radioButtonId]
        };

        const wrapper = mount(
          <OperatorType
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        );

        const operatorTypeRadio = wrapper.find(`Radio#${radioButtonId}`);
        expect(operatorTypeRadio.props().defaultChecked).toBe(true);
      }
    });
  });
});
