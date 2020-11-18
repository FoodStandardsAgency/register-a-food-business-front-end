import EstablishmentAddressType from "../pages/establishment-address-type";
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

describe("<EstablishmentAddressType />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentAddressType />);
    expect(wrapper.length).toBe(1);
  });

  it("renders 3 radio buttons with correct error props and default values", () => {
    const wrapper = mount(
      <EstablishmentAddressType
        validatorErrors={testValidatorErrors}
        cumulativeFullAnswers={testCumulativeAnswers}
        switches={testSwitches}
      />
    );
    const establishmentAddressTypeRadio = wrapper.find("Radio");
    expect(establishmentAddressTypeRadio.length).toBe(3);
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        establishment_type: "test error"
      };
      const wrapper = mount(
        <EstablishmentAddressType
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentAddressType = wrapper.find("MultiChoice");
      expect(establishmentAddressType.props().meta.error).toBe("test error");
    });
  });

  describe("all Radio buttons", () => {
    it("can be selected by default", () => {
      const radioButtonIdsAndValues = {
        establishment_type_business_commercial:
          "Place of business or commercial premises",
        establishment_type_mobile_moveable: "Mobile or moveable premises",
        establishment_type_home_domestic: "Home or domestic premises"
      };

      for (let radioButtonId in radioButtonIdsAndValues) {
        const cumulativeFullAnswers = {
          establishment_type: radioButtonIdsAndValues[radioButtonId]
        };

        const wrapper = mount(
          <EstablishmentAddressType
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        );

        const establishmentAddressTypeRadio = wrapper.find(
          `Radio#${radioButtonId}`
        );
        expect(establishmentAddressTypeRadio.props().defaultChecked).toBe(true);
      }
    });
  });
});
