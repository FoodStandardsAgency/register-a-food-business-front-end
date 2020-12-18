import WaterSupply from "../pages/business-water-supply";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

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
        <I18nextProvider i18n={i18n}>
          <WaterSupply
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
          />
        </I18nextProvider>
      );
      const waterSupplyRadios = wrapper.find("Radio");
      expect(waterSupplyRadios.length).toBe(3);
    });

    it("water_supply_private gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        water_supply: "PRIVATE"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <WaterSupply
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
          />
        </I18nextProvider>
      );
      const privateWaterSupplyRadioButton = wrapper.find(
        "Radio#water_supply_private"
      );
      expect(privateWaterSupplyRadioButton.props().defaultChecked).toBe(true);
    });

    it("water_supply_public gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        water_supply: "PUBLIC"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <WaterSupply
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
          />
        </I18nextProvider>
      );
      const publicWaterSupplyRadioButton = wrapper.find(
        "Radio#water_supply_public"
      );
      expect(publicWaterSupplyRadioButton.props().defaultChecked).toBe(true);
    });

    it("water_supply_public_and_private gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        water_supply: "BOTH"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <WaterSupply
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
          />
        </I18nextProvider>
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
        <I18nextProvider i18n={i18n}>
          <WaterSupply
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
          />
        </I18nextProvider>
      );
      const waterSupplyMultiChoice = wrapper.find("MultiChoice");
      expect(waterSupplyMultiChoice.props().meta.error).toBe("test error");
    });
  });
});
