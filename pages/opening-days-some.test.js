import OpeningSomeDays from "./opening-days-some";
import { shallow, mount } from "enzyme";

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

  describe("renders 7 checkboxes with correct error props and default values", () => {
    it("renders 7 checkboxes", () => {
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const customerTypeCheckBox = wrapper.find("Checkbox");
      expect(customerTypeCheckBox.length).toBe(7);
    });

    it("Monday checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_monday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_day_monday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });

    it("Tuesday checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_tuesday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_day_tuesday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });

    it("Wednesday checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_wednesday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_day_wednesday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });

    it("Thursday checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_thursday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_day_thursday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });

    it("Friday checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_friday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_day_friday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });

    it("Saturday checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_saturday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_day_saturday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });
    it("Sunday checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_sunday: "default"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const OpeningSomeDaysCheckBox = wrapper.find(
        "Checkbox#opening_day_sunday"
      );
      expect(OpeningSomeDaysCheckBox.props().defaultChecked).toBe("default");
    });
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        opening_days_some: "test error"
      };
      const wrapper = mount(
        <OpeningSomeDays
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const openingSomeDays = wrapper.find("MultiChoice");
      expect(openingSomeDays.props().meta.error).toBe("test error");
    });
  });
});
