import Declaration from "../pages/declaration";
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

const submitRegistration = { submit: jest.fn() };

describe("<Declaration />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Declaration />);
    expect(wrapper.length).toBe(1);
  });

  it("displays a disabled button when submission button has been clicked", () => {
    const wrapper = mount(
      shallow(
        <Declaration
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
          submissionError={[]}
          refs={submitRegistration}
        />
      ).get(0)
    );
    expect(wrapper.find("ContinueButton").prop("disabled")).toBe(undefined);
    wrapper.find("ContinueButton").simulate("click");
    expect(wrapper.find("ContinueButton").prop("disabled")).toBe(true);
  });
});
