import EstablishmentOpeningStatus from "../pages/establishment-opening-status";
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

describe("<EstablishmentOpeningStatus />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentOpeningStatus />);
    expect(wrapper.length).toBe(1);
  });

  it("renders 2 radio buttons with correct error props and default values", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <EstablishmentOpeningStatus
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      </I18nextProvider>
    );
    const establishmentTypeRadio = wrapper.find("Radio");
    expect(establishmentTypeRadio.length).toBe(2);
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const actualValidatorErrors = {
        establishment_opening_status: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <EstablishmentOpeningStatus
            validatorErrors={actualValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const establishmentTypeMultiChoice = wrapper.find("MultiChoice");
      expect(establishmentTypeMultiChoice.props().meta.error).toBe(
        "test error"
      );
    });
  });

  describe("all Radio buttons", () => {
    it("can be selected by default", () => {
      const radioButtonIdsAndValues = {
        establishment_opening_status_already_trading:
          "Establishment is already trading",
        establishment_opening_status_not_trading: "Establishment due to trade"
      };

      for (let radioButtonId in radioButtonIdsAndValues) {
        const cumulativeFullAnswers = {
          establishment_opening_status: radioButtonIdsAndValues[radioButtonId]
        };

        const wrapper = mount(
          <I18nextProvider i18n={i18n}>
            <EstablishmentOpeningStatus
              validatorErrors={testValidatorErrors}
              cumulativeFullAnswers={cumulativeFullAnswers}
              switches={testSwitches}
            />
          </I18nextProvider>
        );

        const establishmentTypeRadio = wrapper.find(`Radio#${radioButtonId}`);
        expect(establishmentTypeRadio.props().defaultChecked).toBe(true);
      }
    });
  });
});
