import PartnerName from "../pages/partner-name";
import { shallow, mount } from "enzyme";

const testSwitches = {};

describe("<PartnerName />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<PartnerName />);
    expect(wrapper.length).toBe(1);
  });

  describe("when partners array is not defined", () => {
    it("does not render PartnersTable", () => {
      const wrapper = mount(
        <PartnerName
          partnerDetailsUrl="/partnership/partner-details"
          validatorErrors={{ error: "" }}
          cumulativeFullAnswers={{}}
          switches={testSwitches}
        />
      );
      const partnersTable = wrapper.find("PartnersTable");
      expect(partnersTable.length).toBe(0);

      const partnerRows = wrapper.find("AccessibleTableRow");
      expect(partnerRows.length).toBe(0);

      const addPartner = wrapper.find("#addPartnerLink");
      expect(addPartner.props().href).toBe("/partnership/partner-details");

      const ContinueButton = wrapper.find("ContinueButton");
      expect(ContinueButton.length).toBe(0);
    });
  });

  describe("when partners array is defined and has no items", () => {
    it("does not render PartnersTable", () => {
      const wrapper = mount(
        <PartnerName
          partnerDetailsUrl="/partnership/partner-details"
          validatorErrors={{ error: "" }}
          cumulativeFullAnswers={{ partners: [] }}
          switches={testSwitches}
        />
      );
      const partnersTable = wrapper.find("PartnersTable");
      expect(partnersTable.length).toBe(0);

      const partnerRows = wrapper.find("AccessibleTableRow");
      expect(partnerRows.length).toBe(0);

      const addPartner = wrapper.find("#addPartnerLink");
      expect(addPartner.props().href).toBe("/partnership/partner-details");

      const ContinueButton = wrapper.find("ContinueButton");
      expect(ContinueButton.length).toBe(0);
    });
  });

  describe("when partners array has one item", () => {
    it("renders PartnersTable with that item", () => {
      const wrapper = mount(
        <PartnerName
          partnerDetailsUrl="/partnership/partner-details"
          validatorErrors={{ error: "" }}
          cumulativeFullAnswers={{ partners: ["one"] }}
          switches={testSwitches}
        />
      );
      const partnersTable = wrapper.find("PartnersTable");
      expect(partnersTable.length).toBe(1);

      const partnerRows = wrapper.find("AccessibleTableRow");
      expect(partnerRows.length).toBe(1);

      const addPartner = wrapper.find("#addPartnerLink");
      expect(addPartner.props().href).toBe("/partnership/partner-details");

      const ContinueButton = wrapper.find("ContinueButton");
      expect(ContinueButton.length).toBe(0);
    });
  });

  describe("when partners array has two items", () => {
    it("renders PartnersTable with those items", () => {
      const wrapper = mount(
        <PartnerName
          partnerDetailsUrl="/partnership/partner-details"
          validatorErrors={{ error: "" }}
          cumulativeFullAnswers={{ partners: ["one", "two"] }}
          switches={testSwitches}
        />
      );
      const partnersTable = wrapper.find("PartnersTable");
      expect(partnersTable.length).toBe(1);

      const partnerRows = wrapper.find("AccessibleTableRow");
      expect(partnerRows.length).toBe(2);

      const addPartner = wrapper.find("#addPartnerLink");
      expect(addPartner.props().href).toBe("/partnership/partner-details");

      const ContinueButton = wrapper.find("ContinueButton");
      expect(ContinueButton.length).toBe(1);
    });
  });

  describe("when partners array has five items", () => {
    it("renders PartnersTable with those items", () => {
      const wrapper = mount(
        <PartnerName
          validatorErrors={{ error: "" }}
          cumulativeFullAnswers={{
            partners: ["one", "two", "three", "four", "five"]
          }}
          switches={testSwitches}
        />
      );
      const partnersTable = wrapper.find("PartnersTable");
      expect(partnersTable.length).toBe(1);

      const partnerRows = wrapper.find("AccessibleTableRow");
      expect(partnerRows.length).toBe(5);

      const addPartner = wrapper.find("#addPartnerButton");
      expect(addPartner.length).toBe(0);

      const ContinueButton = wrapper.find("ContinueButton");
      expect(ContinueButton.length).toBe(1);
    });
  });
});
