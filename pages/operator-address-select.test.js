import OperatorAddressLookup from "./operator-address-select";
import { mount, shallow } from "enzyme";

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

const testAddressLookup = {};

describe("<OperatorAddressLookup />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<OperatorAddressLookup />);
    expect(wrapper.length).toBe(1);
  });

  describe("Operator postcode display", () => {
    it("renders even when the addressLookups key is not found", () => {
      const wrapper = mount(
        <OperatorAddressLookup
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
          addressLookups={testAddressLookup}
        />
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
        <OperatorAddressLookup
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
          addressLookups={testAddressLookup}
        />
      );
      const operatorPostcode = wrapper.find(
        "Paragraph.operatorPostcodeDisplay"
      );

      expect(operatorPostcode.text().includes("default")).toBe(true);
    });

    it("renders the dropdown according to the addressLookups object", () => {
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

      const wrapper = mount(
        <OperatorAddressLookup
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
          addressLookups={exampleAddressLookup}
        />
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
