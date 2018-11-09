import OperatorType from "../../pages/operator-type";
import { shallow, mount } from "enzyme";

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
      <OperatorType
        validatorErrors={testValidatorErrors}
        cumulativeFullAnswers={testCumulativeAnswers}
        switches={testSwitches}
      />
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
        <OperatorType
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorType = wrapper.find("MultiChoice");
      expect(operatorType.props().meta.error).toBe("test error");
    });
  });

  describe("all Radio buttons", () => {
    it("can be selected by default", () => {
      const radioButtonIdsAndValues = {
        operator_type_person: "A person",
        operator_type_company: "A company",
        operator_type_charity: "A charity"
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
