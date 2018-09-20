import Declaration from "../../pages/declaration";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

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
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      ).get(0)
    );

    wrapper.instance().refs.submitRegistration = { submit: jest.fn() };

    expect(wrapper.find("ContinueButton").prop("disabled")).toBe(undefined);
    wrapper.find("ContinueButton").simulate("click");
    expect(wrapper.find("ContinueButton").prop("disabled")).toBe(true);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <Declaration
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
