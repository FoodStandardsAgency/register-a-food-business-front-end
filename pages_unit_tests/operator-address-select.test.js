import OperatorAddressLookup from "../pages/operator-address-select";
import { mount, shallow } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";
import { HintText, Heading, Paragraph } from "@slice-and-dice/govuk-react";

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

const testAddressLookup = {};

const testValidatorErrors = {
  example: "test error"
};

const exampleAddressLookup = {
  operator_postcode_find: [
    {
      addressline1: "Allies Computing Ltd",
      addressline2: "Manor Farm Barns",
      addressline3: "Fox Road",
      addressline4: "Framingham Pigot",
      summaryline:
        "Allies Computing Ltd, Manor Farm Barns, Fox Road, Framingham Pigot, Norwich, Norfolk, NR14 7PZ",
      organisation: "Allies Computing Ltd",
      buildingname: "Manor Farm Barns",
      premise: "Manor Farm Barns",
      street: "Fox Road",
      dependentlocality: "Framingham Pigot",
      posttown: "Norwich",
      county: "Norfolk",
      postcode: "NR14 7PZ"
    },
    {
      addressline1: "Room 36",
      addressline2: "Block 1 Arthur Vick",
      addressline3: "Gibbet Hill Road",
      summaryline:
        "Room 36, Block 1 Arthur Vick, Gibbet Hill Road, Coventry, West Midlands, CV4 7AL",
      subbuildingname: "Room 36",
      buildingname: "Block 1 Arthur Vick",
      premise: "Room 36, Block 1 Arthur Vick",
      street: "Gibbet Hill Road",
      posttown: "Norwich",
      county: "Norfolk",
      postcode: "NR14 7PZ"
    }
  ]
};

describe("<OperatorAddressLookup />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorAddressLookup />);
    expect(wrapper.length).toBe(1);
  });
  describe("when registration role is partnership", () => {
    let wrapper;
    beforeEach(() => {
      const cumulativeAnswers = { registration_role: "PARTNERSHIP" };
      wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorAddressLookup
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeAnswers}
            switches={testSwitches}
            addressLookups={exampleAddressLookup}
          />
        </I18nextProvider>
      );
    });

    it("renders correct header", () => {
      const header = wrapper.find(Heading);
      expect(header.at(1).props().children).toBe("Postcode you have entered");
    });
    it("renders correct hint text", () => {
      const hintText = wrapper.find(HintText);
      expect(hintText.first().props().children).toBe(
        "Partnership address is the contact address for the partner who is the main point of contact."
      );
    });
  });
  describe("when registration role is not partnership", () => {
    let wrapper;
    beforeEach(() => {
      const cumulativeAnswers = { registration_role: "TEST" };
      wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorAddressLookup
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={cumulativeAnswers}
            switches={testSwitches}
            addressLookups={exampleAddressLookup}
          />
        </I18nextProvider>
      );
    });

    it("renders correct header", () => {
      const header = wrapper.find(Heading);
      expect(header.at(1).props().children).toBe("Postcode you have entered");
    });
    it("renders correct hint text", () => {
      const hintText = wrapper.find(HintText);
      expect(hintText.first().props().children).toBe(
        "Operator address is the contact address for the operator. For example home address for a sole trader or headquarters address for a limited company."
      );
    });
  });

  describe("Operator postcode display", () => {
    it("renders even when the addressLookups key is not found", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorAddressLookup
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
            addressLookups={testAddressLookup}
            editModeFirstPage="test"
          />
        </I18nextProvider>
      );
      const operatorPostcode = wrapper.find(
        "Paragraph.operatorPostcodeDisplay"
      );
      expect(operatorPostcode.length).toBe(1);
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        operator_postcode_find: "default"
      };
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorAddressLookup
            cumulativeFullAnswers={cumulativeFullAnswers}
            switches={testSwitches}
            addressLookups={testAddressLookup}
          />
        </I18nextProvider>
      );
      const operatorPostcode = wrapper.find(
        "Paragraph.operatorPostcodeDisplay"
      );

      expect(operatorPostcode.text().includes("default")).toBe(true);
    });

    it("renders the dropdown according to the addressLookups object", () => {

      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OperatorAddressLookup
            cumulativeFullAnswers={testCumulativeAnswers}
            switches={testSwitches}
            addressLookups={exampleAddressLookup}
          />
        </I18nextProvider>
      );

      const operatorAddressSelect = wrapper.find(
        "select#operatorAddressDropdown"
      );

      const addressResults = operatorAddressSelect.find("option");

      expect(addressResults.length).toBe(
        exampleAddressLookup.operator_postcode_find.length
      );

      expect(
        addressResults
          .get(0)
          .props.children.includes(
            exampleAddressLookup.operator_postcode_find[0].summaryline
          )
      ).toBe(true);
    });
  });
});
