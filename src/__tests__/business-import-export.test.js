import ImportExportActivities from "../../pages/business-import-export";
import { shallow, mount } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<ImportExportActivities />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ImportExportActivities />);
    expect(wrapper.length).toBe(1);
  });

  describe("renders 3 checkboxes with correct error props and default values", () => {
    it("renders 3 checkboxes", () => {
      const wrapper = mount(
        <ImportExportActivities
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const customerTypeCheckBox = wrapper.find("Checkbox");
      expect(customerTypeCheckBox.length).toBe(3);
    });

    it("directly_import checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        directly_import: "default"
      };
      const wrapper = mount(
        <ImportExportActivities
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const importExportActivitiesCheckBox = wrapper.find(
        "Checkbox#import_export_activities_directly_import"
      );
      expect(importExportActivitiesCheckBox.props().defaultChecked).toBe(
        "default"
      );
    });

    it("directly_export checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        directly_export: "default"
      };
      const wrapper = mount(
        <ImportExportActivities
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const importExportActivitiesCheckBox = wrapper.find(
        "Checkbox#import_export_activities_directly_export"
      );
      expect(importExportActivitiesCheckBox.props().defaultChecked).toBe(
        "default"
      );
    });
    it("no_import_export checkbox gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        no_import_export: "default"
      };
      const wrapper = mount(
        <ImportExportActivities
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const importExportActivitiesCheckBox = wrapper.find(
        "Checkbox#import_export_activities_none"
      );
      expect(importExportActivitiesCheckBox.props().defaultChecked).toBe(
        "default"
      );
    });
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        import_export_activities: "test error"
      };
      const wrapper = mount(
        <ImportExportActivities
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const customerType = wrapper.find("MultiChoice");
      expect(customerType.props().meta.error).toBe("test error");
    });
  });
});
