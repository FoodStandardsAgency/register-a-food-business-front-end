import OperatorAddress from "../pages/operator-address-manual";
import { mount, shallow } from "enzyme";

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

  describe("Operator first line input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operator_address_line_1 = wrapper.find(
        "InputField#operator_address_line_1"
      );
      expect(operator_address_line_1.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_address_line_1: "test error"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorFirstLine = wrapper.find(
        "InputField#operator_address_line_1"
      );
      expect(operatorFirstLine.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_address_line_1: "default"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorFirstLine = wrapper.find(
        "InputField#operator_address_line_1"
      );
      expect(operatorFirstLine.props().input.defaultValue).toBe("default");
    });
  });

  describe("Operator address line 2 input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operator_address_line_2 = wrapper.find(
        "InputField#operator_address_line_2"
      );
      expect(operator_address_line_2.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_address_line_2: "test error"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operator_address_line_2 = wrapper.find(
        "InputField#operator_address_line_2"
      );
      expect(operator_address_line_2.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_address_line_2: "default"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operator_address_line_2 = wrapper.find(
        "InputField#operator_address_line_2"
      );
      expect(operator_address_line_2.props().input.defaultValue).toBe(
        "default"
      );
    });
  });

  describe("Operator town input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorTown = wrapper.find("InputField#operator_town");
      expect(operatorTown.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_town: "test error"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorTown = wrapper.find("InputField#operator_town");
      expect(operatorTown.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_town: "default"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorTown = wrapper.find("InputField#operator_town");
      expect(operatorTown.props().input.defaultValue).toBe("default");
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
      const operatorPostcode = wrapper.find("InputField#operator_postcode");
      expect(operatorPostcode.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        operator_postcode: "test error"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const operatorPostcode = wrapper.find("InputField#operator_postcode");
      expect(operatorPostcode.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_postcode: "default"
      };
      const wrapper = mount(
        <OperatorAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const operatorPostcode = wrapper.find("InputField#operator_postcode");
      expect(operatorPostcode.props().input.defaultValue).toBe("default");
    });
  });

  describe("back button", () => {
    describe("given a truthy switch of '/operator-address-none-found'", () => {
      it("passes council info to href and has href of '/operator-address'", () => {
        const wrapper = mount(
          <OperatorAddress
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            council="cardiff"
            switches={{ "/operator-address-none-found": true }}
          />
        );
        const operatorBackButton = wrapper.find("a#back-link");
        expect(operatorBackButton.props().href).toBe(
          "/new/cardiff/operator-address"
        );
      });
    });

    describe("given a falsy switch of '/operator-address-none-found'", () => {
      it("passes council info to href and has href of '/operator-address-select'", () => {
        const wrapper = mount(
          <OperatorAddress
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            council="cardiff"
            switches={{ "/operator-address-none-found": false }}
          />
        );
        const operatorBackButton = wrapper.find("a#back-link");
        expect(operatorBackButton.props().href).toBe(
          "/new/cardiff/operator-address-select"
        );
      });
    });
  });
});
