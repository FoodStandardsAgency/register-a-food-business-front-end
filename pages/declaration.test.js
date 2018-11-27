import Declaration from "./declaration";
import { shallow, mount } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

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
        />
      ).get(0)
    );

    wrapper.instance().refs.submitRegistration = { submit: jest.fn() };

    expect(wrapper.find("ContinueButton").prop("disabled")).toBe(undefined);
    wrapper.find("ContinueButton").simulate("click");
    expect(wrapper.find("ContinueButton").prop("disabled")).toBe(true);
  });
});
