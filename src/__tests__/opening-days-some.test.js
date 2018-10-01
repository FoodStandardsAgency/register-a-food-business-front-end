import OpeningSomeDays from "../../pages/opening-some-days";
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

describe("<OpeningSomeDays />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OpeningSomeDays />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("renders 7 checkboxes with correct error props and default values", () => {
    it("renders 7 checkboxes", () => {
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const customerTypeCheckBox = wrapper.find("Checkbox");
      expect(customerTypeCheckBox.length).toBe(7);
    });

    it("Monday checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        opening_some_days_monday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_some_days_monday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });

    it("Tuesday checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        opening_some_days_tuesday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_some_days_tuesday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });

    it("Wednesday checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        opening_some_days_wednesday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_some_days_wednesday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });

    it("Thursday checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        opening_some_days_thursday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_some_days_thursday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });

    it("Friday checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        opening_some_days_friday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_some_days_friday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });

    it("Saturday checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        opening_some_days_saturday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_some_days_saturday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });
    it("Sunday checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        opening_some_days_sunday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_some_days_sunday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        opening_some_days: "test error"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const openingSomeDays = wrapper.find("MultiChoice");
      expect(openingSomeDays.props().meta.error).toBe("test error");
    });
  });
});
