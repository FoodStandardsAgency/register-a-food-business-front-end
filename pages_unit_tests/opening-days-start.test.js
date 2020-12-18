import OpeningDaysStart from "../pages/opening-days-start";
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

describe("<OpeningDaysStart />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OpeningDaysStart />);
    expect(wrapper.length).toBe(1);
  });

  it("renders 3 radio buttons with correct error props and default values", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <OpeningDaysStart
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      </I18nextProvider>
    );
    const openingDaysStartRadio = wrapper.find("Radio");
    expect(openingDaysStartRadio.length).toBe(3);
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        opening_days_start: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OpeningDaysStart
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const openingDaysStart = wrapper.find("MultiChoice");
      expect(openingDaysStart.props().meta.error).toBe("test error");
    });
  });

  describe("all Radio buttons", () => {
    it("can be selected by default", () => {
      const radioButtonIdsAndValues = {
        opening_days_start_everyday: "Every day",
        opening_days_start_some_days: "Some days",
        opening_days_start_irregular_days: "Irregular days"
      };

      for (let radioButtonId in radioButtonIdsAndValues) {
        const cumulativeFullAnswers = {
          opening_days_start: radioButtonIdsAndValues[radioButtonId]
        };

        const wrapper = mount(
          <I18nextProvider i18n={i18n}>
            <OpeningDaysStart
              validatorErrors={testValidatorErrors}
              cumulativeFullAnswers={cumulativeFullAnswers}
              switches={testSwitches}
            />
          </I18nextProvider>
        );

        const openingDaysStartRadio = wrapper.find(`Radio#${radioButtonId}`);
        expect(openingDaysStartRadio.props().defaultChecked).toBe(true);
      }
    });
  });
});
