import SummaryTable from "../components/SummaryTable";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

// a complete list of the summary table row IDs

const mandatoryTableRows = [
  "establishmentAddressRow",
  "establishmentAddressTypeRow",
  "operatorAddressRow",
  "establishmentTradingNameRow",
  "operatorNameRow",
  "operatorTypeRow",
  "operatorCompanyNameRow",
  "operatorCompaniesHouseRow",
  "operatorCharityNameRow",
  "activitiesCustomersRow",
  "activitiesBusinessImportExportRow",
  "operatorContactDetailsRow",
  "operatorEmailRow",
  "establishmentContactDetailsRow",
  "establishmentEmailRow",
  "contactRepresentativeRow",
  "establishmentOpeningDateRow",
  "businessTypeRow",
  "businessOtherDetailsRow",
  "establishmentOpeningDaysRow"
];

const editableTableRows = [
  "establishmentAddressTypeRow",
  "establishmentTradingNameRow",
  "operatorTypeRow",
  "operatorNameRow",
  "operatorCompanyNameRow",
  "operatorCompaniesHouseRow",
  "operatorCharityNameRow",
  "operatorCharityNumberRow",
  "operatorContactDetailsRow",
  "operatorEmailRow",
  "establishmentContactDetailsRow",
  "establishmentEmailRow",
  "contactRepresentativeRow",
  "activitiesBusinessImportExportRow",
  "businessTypeRow",
  "activitiesCustomersRow",
  "businessOtherDetailsRow",
  "establishmentOpeningDaysRow"
];

// (only optional if it's optional within that page. Does not apply to pages that are optional or could be skipped.)
const optionalTableRows = ["operatorCharityNumberRow"];

const allTableRows = mandatoryTableRows.concat(optionalTableRows);

// the complete set of possible mandatory answer fields with example data
const testMandatoryAnswers = {
  operator_type: "Sole trader",
  establishment_first_line: "Example first line",
  establishment_postcode: "AA11 1AA",
  operator_first_line: "Example first line",
  operator_postcode: "AA11 1AA",
  establishment_trading_name: "Example trading name",
  operator_first_name: "John",
  operator_last_name: "Appleseed",
  operator_company_name: "Company name",
  operator_company_house_number: "AA123456",
  operator_charity_name: "Charity name",
  customer_type: "End consumer and Other buisnesses",
  import_export_activities: "None",
  operator_primary_number: "1234567",
  operator_email: "operator@email.com",
  establishment_primary_number: "12345678",
  establishment_email: "establishment@email.com",
  contact_representative_email: "representative@email.com",
  contact_representative_number: "123456789",
  contact_representative_name: "Jill",
  establishment_opening_date: "2018-12-06",
  establishment_type: "Mobile or moveable premise",
  business_type: "Livestock farm",
  business_other_details: "This is the best business in the world",
  opening_day_monday: "Monday"
};

// a supplementary set of all optional answer fields with example data
// (only optional if it's optional within that page. Does not apply to pages that are optional or could be skipped.)
const testOptionalAnswers = {
  establishment_street: "Street name",
  establishment_town: "Town",
  operator_street: "Street name",
  operator_town: "Town",
  contact_representative_role: "Coder",
  operator_charity_number: "123456",
  establishment_secondary_number: "7654321",
  operator_secondary_number: "7654321"
};

// the complete set of possible answer fields with example data
const testComprehensiveAnswers = Object.assign(
  {},
  testMandatoryAnswers,
  testOptionalAnswers
);

// the summary table mounted with the complete set of non-optional answers
const wrapperMinimum = mount(<SummaryTable {...testMandatoryAnswers} />);

// the summary table mounted with the complete set of possible answers
const wrapperComprehensive = mount(
  <SummaryTable {...testComprehensiveAnswers} />
);

const wrapperApplicationComplete = mount(
  <SummaryTable {...testComprehensiveAnswers} applicationCompletePage={true} />
);

describe("<SummaryTable />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<SummaryTable />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(<SummaryTable {...testComprehensiveAnswers} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("gets given all answers as props", () => {
    const props = wrapperComprehensive.props();
    expect(props).toEqual(testComprehensiveAnswers);
  });

  describe("when given a comprehensive set of answers", () => {
    it("the number of table rows matches the allTableRows array", () => {
      const rows = wrapperComprehensive
        .find("Row")
        .findWhere(row => {
          const classNameString = row.prop("className") || "";
          return classNameString.includes("TITLE") === false;
        })
        .find("Row");
      expect(rows.length).toEqual(allTableRows.length);
    });

    describe("when given a props of applicationCompletePage = true", () => {
      it("It doesn't render a change button in all editable rows", () => {
        editableTableRows.forEach(tableRowName => {
          const row = wrapperApplicationComplete.find(`Row#${tableRowName}`);
          const buttonId = `change${tableRowName.charAt(0).toUpperCase() +
            tableRowName.substr(1)}`;
          const button = row.find(`Anchor#${buttonId}`);

          expect(button.length).toBe(0);
        });
      });
    });

    it("renders a change button in all editable rows", () => {
      editableTableRows.forEach(tableRowName => {
        const row = wrapperComprehensive.find(`Row#${tableRowName}`);
        const buttonId = `change${tableRowName.charAt(0).toUpperCase() +
          tableRowName.substr(1)}`;
        const button = row.find(`Anchor#${buttonId}`);

        expect(button.length).toBe(1);
      });
    });

    it("renders all table rows", () => {
      allTableRows.forEach(tableRowName => {
        const row = wrapperComprehensive.find(`Row#${tableRowName}`);
        expect(row.length).toBe(1);
      });
    });

    it("contains a non-empty string for every answer", () => {
      for (let answerID in testComprehensiveAnswers) {
        const text = wrapperComprehensive.find(`#${answerID}`).text();
        expect(text).not.toBe("");
      }
    });
  });

  describe("when given a minimum set of answers", () => {
    it("renders all mandatory table rows with at least one piece of data", () => {
      mandatoryTableRows.forEach(tableRowName => {
        const row = wrapperMinimum.find(`Row#${tableRowName}`);
        expect(row.length).toBe(1);

        const answerCells = row.find("td.summaryTableDataCell");
        expect(answerCells.text()).not.toBe("");
      });
    });

    it("contains empty strings or does not find the element for every optional answer", () => {
      for (let answerID in testOptionalAnswers) {
        const element = wrapperMinimum.find(`#${answerID}`);
        if (element.length !== 0) {
          expect(element.text()).toBe("");
        }
      }
    });
  });
});
