import EstablishmentTradingName from "./establishment-trading-name";
import { shallow, mount } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<EstablishmentTradingName />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentTradingName />);
    expect(wrapper.length).toBe(1);
  });

  describe("establishment trading name input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentTradingName
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentTradingName = wrapper.find(
        "InputField#establishment_trading_name"
      );
      expect(establishmentTradingName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_trading_name: "test error"
      };
      const wrapper = mount(
        <EstablishmentTradingName
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentTradingName = wrapper.find(
        "InputField#establishment_trading_name"
      );
      expect(establishmentTradingName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        establishment_trading_name: "default"
      };
      const wrapper = mount(
        <EstablishmentTradingName
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const establishmentTradingName = wrapper.find(
        "InputField#establishment_trading_name"
      );
      expect(establishmentTradingName.props().input.defaultValue).toBe(
        "default"
      );
    });
  });
});
