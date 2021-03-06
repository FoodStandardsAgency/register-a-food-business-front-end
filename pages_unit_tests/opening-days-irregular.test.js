import OpeningDaysIrregular from "../pages/opening-days-irregular";
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

describe("<OpeningDaysIrregular />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OpeningDaysIrregular />);
    expect(wrapper.length).toBe(1);
  });

  describe("Opening Days Irregular input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OpeningDaysIrregular
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const openingDaysIrregular = wrapper.find("TextArea");
      expect(openingDaysIrregular.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        opening_days_irregular: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OpeningDaysIrregular
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const openingDaysIrregular = wrapper.find("TextArea");
      expect(openingDaysIrregular.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_days_irregular: "default"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OpeningDaysIrregular
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const openingDaysIrregular = wrapper.find("TextArea");
      expect(openingDaysIrregular.props().input.defaultValue).toBe("default");
    });
  });
});
