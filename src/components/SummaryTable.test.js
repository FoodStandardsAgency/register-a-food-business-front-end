import SummaryTable from "../components/SummaryTable";
import { shallow, mount } from "enzyme";
import {
  operatorTypeEnum,
  customerTypeEnum,
  businessTypeEnum,
  waterSupplyEnum,
  importExportEnum,
  establishmentTypeEnum
} from "@slice-and-dice/register-a-food-business-validation";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";

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
  "establishmentOpeningDaysRow",
  "waterSupplyRow"
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
  "operatorAddressRow",
  "operatorContactDetailsRow",
  "operatorEmailRow",
  "establishmentAddressRow",
  "establishmentContactDetailsRow",
  "establishmentEmailRow",
  "contactRepresentativeRow",
  "activitiesBusinessImportExportRow",
  "businessTypeRow",
  "activitiesCustomersRow",
  "businessOtherDetailsRow",
  "establishmentOpeningDaysRow",
  "operatorPartnersRow",
  "mainPartnershipContactRow",
  "waterSupplyRow",
  "establishmentOpeningHoursRow"
];
// (only optional if it's optional within that page. Does not apply to pages that are optional or could be skipped.)
const optionalTableRows = [
  "operatorCharityNumberRow",
  "operatorPartnersRow",
  "mainPartnershipContactRow",
  "establishmentOpeningHoursRow"
];

const optionalTableRowsForIrregularDays = [
  "operatorCharityNumberRow",
  "operatorPartnersRow",
  "mainPartnershipContactRow"
];

const declarationRows = [
  "declaration1Row",
  "declaration2Row",
  "declaration3Row"
];
const feedbackRows = ["feedback1Row"];

const allTableRows = mandatoryTableRows.concat(optionalTableRows);

const allTableRowsForIrregularDays = mandatoryTableRows.concat(
  optionalTableRowsForIrregularDays
);

// the complete set of possible mandatory answer fields with example data
const testMandatoryAnswers = {
  operator_type: operatorTypeEnum.SOLETRADER.key,
  establishment_address_line_1: "Address line 1",
  establishment_town: "Town",
  establishment_postcode: "AA11 1AA",
  operator_address_line_1: "Address line 1",
  operator_town: "Town",
  operator_postcode: "AA11 1AA",
  establishment_trading_name: "Example trading name",
  operator_first_name: "John",
  operator_last_name: "Appleseed",
  operator_company_name: "Company name",
  operator_companies_house_number: "AA123456",
  operator_charity_name: "Charity name",
  customer_type: customerTypeEnum.BOTH.key,
  import_export_activities: importExportEnum.NONE.key,
  operator_primary_number: "1234567",
  operator_email: "operator@email.com",
  establishment_primary_number: "12345678",
  establishment_email: "establishment@email.com",
  contact_representative_email: "representative@email.com",
  contact_representative_number: "123456789",
  contact_representative_name: "Jill",
  establishment_opening_date: "2018-12-06",
  establishment_type: establishmentTypeEnum.MOBILE.key,
  business_type: businessTypeEnum["003"].key,
  business_other_details: "This is the best business in the world",
  opening_days_some: "Monday",
  opening_day_monday: "Monday",
  water_supply: waterSupplyEnum.PRIVATE.key,
  validatorErrors: {}
};

const testMandatoryAnswersForPartnership = {
  operator_type: operatorTypeEnum.PARTNERSHIP.key,
  establishment_address_line_1: "Example address line 1",
  establishment_postcode: "AA11 1AA",
  operator_address_line_1: "Example address line 1",
  operator_postcode: "AA11 1AA",
  establishment_trading_name: "Example trading name",
  operator_first_name: "John",
  operator_last_name: "Appleseed",
  operator_company_name: "Company name",
  operator_companies_house_number: "AA123456",
  operator_charity_name: "Charity name",
  customer_type: customerTypeEnum.BOTH.key,
  import_export_activities: importExportEnum.NONE.key,
  operator_primary_number: "1234567",
  operator_email: "operator@email.com",
  establishment_primary_number: "12345678",
  establishment_email: "establishment@email.com",
  contact_representative_email: "representative@email.com",
  contact_representative_number: "123456789",
  contact_representative_name: "Jill",
  establishment_opening_date: "2018-12-06",
  establishment_type: establishmentTypeEnum.MOBILE.key,
  business_type: businessTypeEnum["003"].key,
  business_other_details: "This is the best business in the world",
  opening_days_some: "Monday",
  opening_day_monday: "Monday",
  water_supply: waterSupplyEnum.PRIVATE.key,
  validatorErrors: {}
};

const testMandatoryAnswersForIrregularDays = {
  operator_type: operatorTypeEnum.SOLETRADER.key,
  establishment_address_line_1: "Address line 1",
  establishment_postcode: "AA11 1AA",
  operator_address_line_1: "Address line 1",
  operator_postcode: "AA11 1AA",
  establishment_trading_name: "Example trading name",
  operator_first_name: "John",
  operator_last_name: "Appleseed",
  operator_company_name: "Company name",
  operator_companies_house_number: "AA123456",
  operator_charity_name: "Charity name",
  customer_type: customerTypeEnum.BOTH.key,
  import_export_activities: importExportEnum.NONE.key,
  operator_primary_number: "1234567",
  operator_email: "operator@email.com",
  establishment_primary_number: "12345678",
  establishment_email: "establishment@email.com",
  contact_representative_email: "representative@email.com",
  contact_representative_number: "123456789",
  contact_representative_name: "Jill",
  establishment_opening_date: "2018-12-06",
  establishment_type: establishmentTypeEnum.MOBILE.key,
  business_type: businessTypeEnum["003"].key,
  business_other_details: "This is the best business in the world",
  opening_days_irregular: "Open on the 29th Feb",
  water_supply: waterSupplyEnum.PRIVATE.key,
  validatorErrors: {}
};

// a supplementary set of all optional answer fields with example data
// (only optional if it's optional within that page. Does not apply to pages that are optional or could be skipped.)
const testOptionalMiscAnswers = {
  contact_representative_role: "Coder",
  operator_charity_number: "123456",
  establishment_secondary_number: "7654321",
  operator_secondary_number: "7654321",
  partners: ["John", "Doe"],
  main_partnership_contact: "John",
  opening_hours_monday: "9:30 - 19:00",
  opening_hours_tuesday: "09:30 - 19:00",
  opening_hours_wednesday: "9:30am - 7pm",
  opening_hours_thursday: "0930 - 1900",
  opening_hours_friday: "9:30 to 19:00",
  opening_hours_saturday: "09:30 to 19:00",
  opening_hours_sunday: "From 9:30 to 19:00"
};

const testOptionalAddressAnswers = {
  establishment_address_line_2: "Address line 2",
  establishment_address_line_3: "Address line 3",

  operator_address_line_2: "Address line 2",
  operator_address_line_3: "Address line 3"
};

const testOptionalAnswers = Object.assign(
  {},
  testOptionalMiscAnswers,
  testOptionalAddressAnswers
);

const testOptionalAnswersForIrregularDays = {
  establishment_address_line_2: "Street name",
  establishment_town: "Town",
  operator_address_line_2: "Street name",
  operator_town: "Town",
  contact_representative_role: "Coder",
  operator_charity_number: "123456",
  establishment_secondary_number: "7654321",
  operator_secondary_number: "7654321",
  partners: ["John", "Doe"],
  main_partnership_contact: "John"
};

const testDeclarationAnswers = {
  declaration1: "declaration",
  declaration2: "declaration",
  declaration3: "declaration"
};

const testFeedbackAnswers = {
  feedback1: "feedback"
};

// the complete set of possible answer fields with example data
const testComprehensiveAnswers = Object.assign(
  {},
  testMandatoryAnswers,
  testOptionalAnswers
);

const testComprehensiveAnswersDeclaration = Object.assign(
  {},
  testMandatoryAnswers,
  testDeclarationAnswers
);

const testComprehensiveAnswersDeclarationFeedback = Object.assign(
  {},
  testMandatoryAnswers,
  testDeclarationAnswers,
  testFeedbackAnswers
);

const testComprehensiveAnswersForPartnership = Object.assign(
  {},
  testMandatoryAnswersForPartnership,
  testOptionalAnswers
);

const testComprehensiveAnswersForIrregularDays = Object.assign(
  {},
  testMandatoryAnswersForIrregularDays,
  testOptionalAnswersForIrregularDays
);

// the summary table mounted with the complete set of non-optional answers
const wrapperMinimum = mount(<SummaryTable {...testMandatoryAnswers} />);
const wrapperMinimumForPartnership = mount(
  <SummaryTable {...testMandatoryAnswersForPartnership} validatorErrors={{}} />
);
const wrapperMinimumForIrregularDays = mount(
  <SummaryTable
    {...testMandatoryAnswersForIrregularDays}
    validatorErrors={{}}
  />
);

// the summary table mounted with the complete set of possible answers
const wrapperComprehensive = mount(
  <SummaryTable {...testComprehensiveAnswers} validatorErrors={{}} />
);
const wrapperComprehensiveForPartnership = mount(
  <SummaryTable
    {...testComprehensiveAnswersForPartnership}
    validatorErrors={{}}
  />
);

const wrapperComprehensiveForIrregularDays = mount(
  <SummaryTable
    {...testComprehensiveAnswersForIrregularDays}
    validatorErrors={{}}
  />
);

const wrapperApplicationComplete = mount(
  <SummaryTable
    {...testComprehensiveAnswersDeclaration}
    validatorErrors={{}}
    applicationCompletePage={true}
  />
);

const wrapperApplicationCompleteWithFeedback = mount(
  <SummaryTable
    {...testComprehensiveAnswersDeclarationFeedback}
    validatorErrors={{}}
    applicationCompletePage={true}
  />
);

const wrapperApplicationCompleteForPartnership = mount(
  <SummaryTable
    {...testComprehensiveAnswersForPartnership}
    validatorErrors={{}}
    applicationCompletePage={true}
  />
);

describe("<SummaryTable />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <I18nextProvider i18n={i18n}>
        <SummaryTable />
      </I18nextProvider>
    );
    expect(wrapper.length).toBe(1);
  });

  it("gets given all answers as props", () => {
    const props = wrapperComprehensive.props();
    expect(props).toEqual(testComprehensiveAnswers);
  });
  describe("when registation role is sole trader", () => {
    describe("when given a comprehensive set of answers", () => {
      it("the number of table rows matches the allTableRows array", () => {
        const rows = wrapperComprehensive.find("AccessibleRowHeader");

        expect(rows.length).toEqual(allTableRows.length);
      });

      it("contains populated values for every optional address answer", () => {
        for (let answerID in testOptionalAddressAnswers) {
          const element = wrapperComprehensive.find(`#${answerID}`);
          expect(element.text()).toBe(testOptionalAddressAnswers[answerID]);
        }
      });

      describe("when given a props of applicationCompletePage = true", () => {
        it("It doesn't render a change button in all editable rows", () => {
          editableTableRows.forEach((tableRowName) => {
            const row = wrapperApplicationComplete.find(`tr#${tableRowName}`);
            const buttonId = `change${
              tableRowName.charAt(0).toUpperCase() + tableRowName.substr(1)
            }`;
            const button = row.find(`a#${buttonId}`);

            expect(button.length).toBe(0);
          });
        });
      });

      it("renders a change button in all editable rows", () => {
        editableTableRows.forEach((tableRowName) => {
          const row = wrapperComprehensive.find(`tr#${tableRowName}`);
          const buttonId = `change${
            tableRowName.charAt(0).toUpperCase() + tableRowName.substr(1)
          }`;
          const button = row.find(`a#${buttonId}`);
          expect(button.length).toBe(1);
        });
      });

      it("renders all table rows", () => {
        allTableRows.forEach((tableRowName) => {
          const row = wrapperComprehensive.find(`tr#${tableRowName}`);
          expect(row.length).toBe(1);
        });
      });

      describe("when opening days are irregular", () => {
        it("the number of table rows matches the allTableRows array minus the establishment opening hours row", () => {
          const rows = wrapperComprehensiveForIrregularDays.find(
            "AccessibleRowHeader"
          );

          expect(rows.length).toEqual(allTableRowsForIrregularDays.length);
        });

        describe("when given a props of applicationCompletePage = true", () => {
          it("It doesn't render a change button in all editable rows", () => {
            editableTableRows.forEach((tableRowName) => {
              const row = wrapperApplicationComplete.find(`tr#${tableRowName}`);
              const buttonId = `change${
                tableRowName.charAt(0).toUpperCase() + tableRowName.substr(1)
              }`;
              const button = row.find(`a#${buttonId}`);

              expect(button.length).toBe(0);
            });
          });
        });

        it("renders a change button in all editable rows", () => {
          editableTableRows.forEach((tableRowName) => {
            const row = wrapperComprehensive.find(`tr#${tableRowName}`);
            const buttonId = `change${
              tableRowName.charAt(0).toUpperCase() + tableRowName.substr(1)
            }`;
            const button = row.find(`a#${buttonId}`);
            expect(button.length).toBe(1);
          });
        });

        it("renders all table rows", () => {
          allTableRowsForIrregularDays.forEach((tableRowName) => {
            const row = wrapperComprehensiveForIrregularDays.find(
              `tr#${tableRowName}`
            );
            expect(row.length).toBe(1);
          });
        });
      });
    });
  });

  describe("when registation role is partnership", () => {
    describe("when given a comprehensive set of answers", () => {
      it("the number of table rows matches the allTableRows array", () => {
        const rows = wrapperComprehensiveForPartnership.find(
          "AccessibleRowHeader"
        );

        expect(rows.length).toEqual(allTableRows.length);
      });

      describe("when given a props of applicationCompletePage = true", () => {
        it("It doesn't render a change button in all editable rows", () => {
          editableTableRows.forEach((tableRowName) => {
            const row = wrapperApplicationCompleteForPartnership.find(
              `tr#${tableRowName}`
            );
            const buttonId = `change${
              tableRowName.charAt(0).toUpperCase() + tableRowName.substr(1)
            }`;
            const button = row.find(`a#${buttonId}`);

            expect(button.length).toBe(0);
          });
        });
      });

      it("renders a change button in all editable rows", () => {
        editableTableRows.forEach((tableRowName) => {
          const row = wrapperComprehensiveForPartnership.find(
            `tr#${tableRowName}`
          );
          const buttonId = `change${
            tableRowName.charAt(0).toUpperCase() + tableRowName.substr(1)
          }`;
          const button = row.find(`a#${buttonId}`);
          expect(button.length).toBe(1);
        });
      });

      it("renders all table rows", () => {
        allTableRows.forEach((tableRowName) => {
          const row = wrapperComprehensiveForPartnership.find(
            `tr#${tableRowName}`
          );
          expect(row.length).toBe(1);
        });
      });
    });
  });
  describe("when applicationCompletePage equals true", () => {
    it("renders the declaration table rows", () => {
      declarationRows.forEach((tableRowName) => {
        const row = wrapperApplicationComplete.find(`tr#${tableRowName}`);
        expect(row.length).toBe(1);
      });
    });
    it("doesn't render the feedback table row", () => {
      feedbackRows.forEach((tableRowName) => {
        const row = wrapperApplicationComplete.find(`tr#${tableRowName}`);
        expect(row.length).toBe(0);
      });
    });
    it("does render the feedback table row when specified", () => {
      feedbackRows.forEach((tableRowName) => {
        const row = wrapperApplicationCompleteWithFeedback.find(
          `tr#${tableRowName}`
        );
        expect(row.length).toBe(1);
      });
    });
  });
  describe("when registration role is sole trader", () => {
    describe("when given a minimum set of answers", () => {
      it("renders all mandatory table rows", () => {
        mandatoryTableRows.forEach((tableRowName) => {
          const row = wrapperMinimum.find(`tr#${tableRowName}`);
          expect(row.length).toBe(1);
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
      describe("when opening days are irregular", () => {
        it("renders all mandatory table rows", () => {
          mandatoryTableRows.forEach((tableRowName) => {
            const row = wrapperMinimumForIrregularDays.find(
              `tr#${tableRowName}`
            );
            expect(row.length).toBe(1);
          });
        });

        it("contains empty strings or does not find the element for every optional answer", () => {
          for (let answerID in testOptionalAnswersForIrregularDays) {
            const element = wrapperMinimumForIrregularDays.find(`#${answerID}`);
            if (element.length !== 0) {
              expect(element.text()).toBe("");
            }
          }
        });
      });
    });
  });
  describe("when the registration role is partnership", () => {
    describe("when given a minimum set of answers", () => {
      it("renders all mandatory table rows", () => {
        mandatoryTableRows.forEach((tableRowName) => {
          const row = wrapperMinimumForPartnership.find(`tr#${tableRowName}`);
          expect(row.length).toBe(1);
        });
      });

      it("contains empty strings or does not find the element for every optional answer", () => {
        for (let answerID in testOptionalAnswers) {
          const element = wrapperMinimumForPartnership.find(`#${answerID}`);
          if (element.length !== 0) {
            expect(element.text()).toBe("");
          }
        }
      });
    });
  });
});
