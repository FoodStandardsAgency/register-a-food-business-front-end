import OpeningHours from "../pages/opening-hours";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

const testValidatorErrors = {
  example: "test error"
};

const allDaysOpen = {
  opening_day_monday: "Monday",
  opening_day_tuesday: "Tuesday",
  opening_day_wednesday: "Wednesday",
  opening_day_thursday: "Thursday",
  opening_day_friday: "Friday",
  opening_day_saturday: "Saturday",
  opening_day_sunday: "Sunday"
};

describe("<OpeningHours />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OpeningHours />);
    expect(wrapper.length).toBe(1);
  });

  describe("renders input fields for days the establishment is open with correct error props and default values", () => {
    it("does not render any input field when closed", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OpeningHours
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={{}}
          />
        </I18nextProvider>
      );
      const inputFields = wrapper.find("InputField");
      expect(inputFields.length).toBe(0);
    });

    it("renders all input fields if open every day", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OpeningHours
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={{ opening_days_start: "Every day" }}
          />
        </I18nextProvider>
      );
      const inputFields = wrapper.find("InputField");
      expect(inputFields.length).toBe(7);
    });

    it("renders Monday input field when open", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OpeningHours
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={{ opening_day_monday: "Monday" }}
          />
        </I18nextProvider>
      );
      const inputFields = wrapper.find("InputField");
      expect(inputFields.length).toBe(1);
      expect(inputFields.prop("id")).toBe("opening_hours_monday");
    });

    it("renders Tuesday input field when open", () => {
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={{ opening_day_tuesday: "Tuesday" }}
        />
      );
      const inputFields = wrapper.find("InputField");
      expect(inputFields.length).toBe(1);
      expect(inputFields.prop("id")).toBe("opening_hours_tuesday");
    });

    it("renders Wednesday input field when open", () => {
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={{ opening_day_wednesday: "Wednesday" }}
        />
      );
      const inputFields = wrapper.find("InputField");
      expect(inputFields.length).toBe(1);
      expect(inputFields.prop("id")).toBe("opening_hours_wednesday");
    });
    it("renders Thursday input field when open", () => {
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={{ opening_day_thursday: "Thursday" }}
        />
      );
      const inputFields = wrapper.find("InputField");
      expect(inputFields.length).toBe(1);
      expect(inputFields.prop("id")).toBe("opening_hours_thursday");
    });

    it("renders Friday input field when open", () => {
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={{ opening_day_friday: "Friday" }}
        />
      );
      const inputFields = wrapper.find("InputField");
      expect(inputFields.length).toBe(1);
      expect(inputFields.prop("id")).toBe("opening_hours_friday");
    });

    it("renders Saturday input field when open", () => {
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={{ opening_day_saturday: "Saturday" }}
        />
      );
      const inputFields = wrapper.find("InputField");
      expect(inputFields.length).toBe(1);
      expect(inputFields.prop("id")).toBe("opening_hours_saturday");
    });

    it("renders Sunday input field when open", () => {
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={{ opening_day_sunday: "Sunday" }}
        />
      );
      const inputFields = wrapper.find("InputField");
      expect(inputFields.length).toBe(1);
      expect(inputFields.prop("id")).toBe("opening_hours_sunday");
    });
    it("renders all input fields when open every day", () => {
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={allDaysOpen}
        />
      );
      const inputFields = wrapper.find("InputField");
      expect(inputFields.length).toBe(7);
    });

    it("Monday input field gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_monday: "Monday",
        opening_hours_monday: "default"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find("InputField#opening_hours_monday");
      expect(OpeningHoursField.props().input.defaultValue).toBe("default");
    });
    it("Tuesday input field gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_tuesday: "Tuesday",
        opening_hours_tuesday: "default"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find(
        "InputField#opening_hours_tuesday"
      );
      expect(OpeningHoursField.props().input.defaultValue).toBe("default");
    });
    it("Wednesday input field gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_wednesday: "Wednesday",
        opening_hours_wednesday: "default"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find(
        "InputField#opening_hours_wednesday"
      );
      expect(OpeningHoursField.props().input.defaultValue).toBe("default");
    });

    it("Thursday input field gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_thursday: "Thursday",
        opening_hours_thursday: "default"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find(
        "InputField#opening_hours_thursday"
      );
      expect(OpeningHoursField.props().input.defaultValue).toBe("default");
    });
    it("Friday input field gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_friday: "Friday",
        opening_hours_friday: "default"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find("InputField#opening_hours_friday");
      expect(OpeningHoursField.props().input.defaultValue).toBe("default");
    });
    it("Saturday input field gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_saturday: "Saturday",
        opening_hours_saturday: "default"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find(
        "InputField#opening_hours_saturday"
      );
      expect(OpeningHoursField.props().input.defaultValue).toBe("default");
    });
    it("Sunday input field gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        opening_day_sunday: "Sunday",
        opening_hours_sunday: "default"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find("InputField#opening_hours_sunday");
      expect(OpeningHoursField.props().input.defaultValue).toBe("default");
    });
    it("two different input fields get given correct default values", () => {
      const cumulativeFullAnswers = {
        opening_day_sunday: "Sunday",
        opening_hours_sunday: "8 to 15",
        opening_day_monday: "Monday",
        opening_hours_monday: "9:00 to 20:00"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursFieldSunday = wrapper.find(
        "InputField#opening_hours_sunday"
      );
      const OpeningHoursFieldMonday = wrapper.find(
        "InputField#opening_hours_monday"
      );
      expect(OpeningHoursFieldSunday.props().input.defaultValue).toBe(
        "8 to 15"
      );
      expect(OpeningHoursFieldMonday.props().input.defaultValue).toBe(
        "9:00 to 20:00"
      );
    });
    it("renders correct error message for Monday field", () => {
      const cumulativeFullAnswers = {
        opening_day_monday: "Monday"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={{
            opening_hours_monday: "invalid opening hours on monday"
          }}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find("InputField#opening_hours_monday");
      expect(OpeningHoursField.props().meta.error).toBe(
        "invalid opening hours on monday"
      );
    });
    it("renders correct error message for Tuesday field", () => {
      const cumulativeFullAnswers = {
        opening_day_tuesday: "Tuesday"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={{
            opening_hours_tuesday: "invalid opening hours on tuesday"
          }}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find(
        "InputField#opening_hours_tuesday"
      );
      expect(OpeningHoursField.props().meta.error).toBe(
        "invalid opening hours on tuesday"
      );
    });
    it("renders correct error message for Wednesday field", () => {
      const cumulativeFullAnswers = {
        opening_day_wednesday: "Wednesday"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={{
            opening_hours_wednesday: "invalid opening hours on wednesday"
          }}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find(
        "InputField#opening_hours_wednesday"
      );
      expect(OpeningHoursField.props().meta.error).toBe(
        "invalid opening hours on wednesday"
      );
    });
    it("renders correct error message for Thursday field", () => {
      const cumulativeFullAnswers = {
        opening_day_thursday: "Thursday"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={{
            opening_hours_thursday: "invalid opening hours on thursday"
          }}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find(
        "InputField#opening_hours_thursday"
      );
      expect(OpeningHoursField.props().meta.error).toBe(
        "invalid opening hours on thursday"
      );
    });
    it("renders correct error message for Friday field", () => {
      const cumulativeFullAnswers = {
        opening_day_friday: "Friday"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={{
            opening_hours_friday: "invalid opening hours on friday"
          }}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find("InputField#opening_hours_friday");
      expect(OpeningHoursField.props().meta.error).toBe(
        "invalid opening hours on friday"
      );
    });
    it("renders correct error message for Saturday field", () => {
      const cumulativeFullAnswers = {
        opening_day_saturday: "Saturday"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={{
            opening_hours_saturday: "invalid opening hours on saturday"
          }}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find(
        "InputField#opening_hours_saturday"
      );
      expect(OpeningHoursField.props().meta.error).toBe(
        "invalid opening hours on saturday"
      );
    });
    it("renders correct error message for Sunday field", () => {
      const cumulativeFullAnswers = {
        opening_day_sunday: "Sunday"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={{
            opening_hours_sunday: "invalid opening hours on sunday"
          }}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursField = wrapper.find("InputField#opening_hours_sunday");
      expect(OpeningHoursField.props().meta.error).toBe(
        "invalid opening hours on sunday"
      );
    });
    it("renders correct error message for two different fields", () => {
      const cumulativeFullAnswers = {
        opening_day_sunday: "Sunday",
        opening_day_monday: "Monday"
      };
      const wrapper = mount(
        <OpeningHours
          validatorErrors={{
            opening_hours_sunday: "invalid opening hours on sunday",
            opening_hours_monday: "invalid opening hours on monday"
          }}
          cumulativeFullAnswers={cumulativeFullAnswers}
        />
      );
      const OpeningHoursFieldSunday = wrapper.find(
        "InputField#opening_hours_sunday"
      );
      const OpeningHoursFieldMonday = wrapper.find(
        "InputField#opening_hours_monday"
      );
      expect(OpeningHoursFieldSunday.props().meta.error).toBe(
        "invalid opening hours on sunday"
      );
      expect(OpeningHoursFieldMonday.props().meta.error).toBe(
        "invalid opening hours on monday"
      );
    });
  });
});
