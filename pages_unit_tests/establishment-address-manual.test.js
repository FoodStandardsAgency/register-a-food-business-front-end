import EstablishmentAddress from "../pages/establishment-address-manual";
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

  describe("establishment first line input field", () => {
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
      const establishment_address_line_1 = wrapper.find(
        "InputField#establishment_address_line_1"
      );
      expect(establishment_address_line_1.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_address_line_1: "test error"
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
      const establishmentFirstLine = wrapper.find(
        "InputField#establishment_address_line_1"
      );
      expect(establishmentFirstLine.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        establishment_address_line_1: "default"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <EstablishmentAddress
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const establishmentFirstLine = wrapper.find(
        "InputField#establishment_address_line_1"
      );
      expect(establishmentFirstLine.props().input.defaultValue).toBe("default");
    });
  });

  describe("back button", () => {
    describe("given a truthy switch of '/establishment-address-none-found'", () => {
      it("passes council info to href and has href of '/establishment-address'", () => {
        const wrapper = mount(
          <I18nextProvider i18n={i18n}>
            <EstablishmentAddress
              validatorErrors={testValidatorErrors}
              cumulativeFullAnswers={testCumulativeAnswers}
              council="cardiff"
              switches={{ "/establishment-address-none-found": true }}
            />
          </I18nextProvider>
        );
        const establishmentBackButton = wrapper.find("a#back-link");
        expect(establishmentBackButton.props().href).toBe(
          "/new/cardiff/establishment-address"
        );
      });
    });

    describe("given a falsy switch of '/establishment-address-none-found'", () => {
      it("passes council info to href and has href of '/establishment-address-select'", () => {
        const wrapper = mount(
          <I18nextProvider i18n={i18n}>
            <EstablishmentAddress
              validatorErrors={testValidatorErrors}
              cumulativeFullAnswers={testCumulativeAnswers}
              council="cardiff"
              switches={{ "/establishment-address-none-found": false }}
            />
          </I18nextProvider>
        );
        const establishmentBackButton = wrapper.find("a#back-link");
        expect(establishmentBackButton.props().href).toBe(
          "/new/cardiff/establishment-address-select"
        );
      });
    });
  });
});
