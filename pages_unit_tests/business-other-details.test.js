import OtherDetails from "../pages/business-other-details";
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

describe("<OtherDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OtherDetails />);
    expect(wrapper.length).toBe(1);
  });

  describe("other details input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OtherDetails
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const businessOtherDetails = wrapper.find("TextArea");
      expect(businessOtherDetails.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        business_other_details: "test error"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OtherDetails
            validatorErrors={validatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const businessOtherDetails = wrapper.find("TextArea");
      expect(businessOtherDetails.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        business_other_details: "default"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OtherDetails
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const businessOtherDetails = wrapper.find("TextArea");
      expect(businessOtherDetails.props().input.defaultValue).toBe("default");
    });
  });
});
