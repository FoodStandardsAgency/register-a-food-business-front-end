import WaterSupply from "../pages/business-water-supply";
import { shallow, mount } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

describe("<WaterSupply />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<WaterSupply />);
    expect(wrapper.length).toBe(1);
  });

  describe("renders 3 radio buttons with correct error props and default values", () => {
    it("renders 3 radio buttons", () => {
      const wrapper = mount(
        <WaterSupply
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
        />
      );
      const waterSupplyRadios = wrapper.find("Radio");
      expect(waterSupplyRadios.length).toBe(3);
    });

    it("water_supply_private gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        water_supply: "Private"
      };
      const wrapper = mount(
        <WaterSupply
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const privateWaterSupplyRadioButton = wrapper.find(
        "Radio#water_supply_private"
      );
      expect(privateWaterSupplyRadioButton.props().defaultChecked).toBe(true);
    });

    it("water_supply_public gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        water_supply: "Public"
      };
      const wrapper = mount(
        <WaterSupply
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const publicWaterSupplyRadioButton = wrapper.find(
        "Radio#water_supply_public"
      );
      expect(publicWaterSupplyRadioButton.props().defaultChecked).toBe(true);
    });

    it("water_supply_public_and_private gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        water_supply: "Public and private"
      };
      const wrapper = mount(
        <WaterSupply
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const publicAndPrivateWaterSupplyRadioButton = wrapper.find(
        "Radio#water_supply_public_and_private"
      );
      expect(
        publicAndPrivateWaterSupplyRadioButton.props().defaultChecked
      ).toBe(true);
    });
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        water_supply: "test error"
      };
      const wrapper = mount(
        <WaterSupply
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
        />
      );
      const waterSupplyMultiChoice = wrapper.find("MultiChoice");
      expect(waterSupplyMultiChoice.props().meta.error).toBe("test error");
    });
  });
});
