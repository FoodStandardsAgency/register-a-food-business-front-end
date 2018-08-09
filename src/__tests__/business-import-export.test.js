import ImportExportActivities from "../../pages/business-import-export";
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

describe("<ImportExportActivities />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ImportExportActivities />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(
        <ImportExportActivities
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  describe("renders 3 checkboxes with correct error props and default values", () => {
    it("renders 3 checkboxes", () => {
      const wrapper = mount(
        <ImportExportActivities
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const customerTypeCheckBox = wrapper.find("Checkbox");
      expect(customerTypeCheckBox.length).toBe(3);
    });

    it("directly_import checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        directly_import: "default"
      };
      const wrapper = mount(
        <ImportExportActivities
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const importExportActivitiesCheckBox = wrapper.find(
        "Checkbox#business_import_export_directly_import"
      );
      expect(importExportActivitiesCheckBox.props().defaultChecked).toBe(
        "default"
      );
    });

    it("directly_export checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        directly_export: "default"
      };
      const wrapper = mount(
        <ImportExportActivities
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const importExportActivitiesCheckBox = wrapper.find(
        "Checkbox#business_import_export_directly_export"
      );
      expect(importExportActivitiesCheckBox.props().defaultChecked).toBe(
        "default"
      );
    });
    it("no_import_export checkbox gets given the correct default value", () => {
      const cumulativeAnswers = {
        no_import_export: "default"
      };
      const wrapper = mount(
        <ImportExportActivities
          validatorErrors={testValidatorErrors}
          cumulativeAnswers={cumulativeAnswers}
          switches={testSwitches}
        />
      );
      const importExportActivitiesCheckBox = wrapper.find(
        "Checkbox#business_import_export_none"
      );
      expect(importExportActivitiesCheckBox.props().defaultChecked).toBe(
        "default"
      );
    });
  });

  describe("top-level MultiChoice element", () => {
    it("renders the correct error", () => {
      const validatorErrors = {
        business_import_export: "test error"
      };
      const wrapper = mount(
        <ImportExportActivities
          validatorErrors={validatorErrors}
          cumulativeAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const customerType = wrapper.find("MultiChoice");
      expect(customerType.props().meta.error).toBe("test error");
    });
  });
});
