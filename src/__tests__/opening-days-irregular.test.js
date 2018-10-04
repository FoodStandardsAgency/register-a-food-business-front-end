import OpeningDaysIrregular from "../../pages/opening-days-irregular";
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

describe("<OpeningDaysIrregular />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OpeningDaysIrregular />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <OpeningDaysIrregular
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("Opening Days Irregular input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <OpeningDaysIrregular
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const openingDaysIrregular = wrapper.find("TextArea");
      expect(openingDaysIrregular.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        opening_days_irregular: "test error"
      };
      const wrapper = mount(
        <OpeningDaysIrregular
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const openingDaysIrregular = wrapper.find("TextArea");
      expect(openingDaysIrregular.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeAnswers = {
        opening_days_irregular: "default"
      };
      const wrapper = mount(
        <OpeningDaysIrregular
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const openingDaysIrregular = wrapper.find("TextArea");
      expect(openingDaysIrregular.props().input.defaultValue).toBe("default");
    });
  });
});
