import EstablishmentAddress from "../pages/establishment-address";
import { mount, shallow } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<EstablishmentAddress />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentAddress />);
    expect(wrapper.length).toBe(1);
  });

  describe("Establishment postcode field", () => {
    it("renders", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <EstablishmentAddress
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const establishmentPostcode = wrapper.find(
        "InputField#establishment_postcode_find"
      );
      expect(establishmentPostcode.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_postcode_find: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <EstablishmentAddress
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const establishmentPostcode = wrapper.find(
        "InputField#establishment_postcode_find"
      );
      expect(establishmentPostcode.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        establishment_postcode_find: "default"
      };
      const wrapper = mount(
        <EstablishmentAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const establishmentPostcode = wrapper.find(
        "InputField#establishment_postcode_find"
      );
      expect(establishmentPostcode.props().input.defaultValue).toBe("default");
    });
  });
});
