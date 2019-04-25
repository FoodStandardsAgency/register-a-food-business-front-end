import PartnerName from "../pages/partner-name";
import { shallow, mount } from "enzyme";


const testSwitches = {};

describe("<PartnerName />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<PartnerName />);
    expect(wrapper.length).toBe(1);
  });

  describe("no partners PartnersTable table", () => {
    it("renders", () => {
      const wrapper = mount(
        <PartnerName
          validatorErrors={{error: ""}}
          cumulativeFullAnswers={{}}
          switches={testSwitches}
        />
      );
      const partnersTable = wrapper.find("PartnersTable");
      expect(partnersTable.length).toBe(0);

      const partnerRows = wrapper.find("AccessibleTableRow");
          expect(partnerRows.length).toBe(0);

      const addPartner = wrapper.find("#addPartnerButton");
      expect(addPartner.first().props().formAction).toBe("/partnership/partner-details");

      const ContinueButton = wrapper.find("ContinueButton");
      expect(ContinueButton.length).toBe(0);
    });
  });

  describe("Empty PartnersTable table", () => {
    it("renders", () => {
      const wrapper = mount(
        <PartnerName
          validatorErrors={{error: ""}}
          cumulativeFullAnswers={{partners: [] }}
          switches={testSwitches}
        />
      );
      const partnersTable = wrapper.find("PartnersTable");
      expect(partnersTable.length).toBe(1);

      const partnerRows = wrapper.find("AccessibleTableRow");
          expect(partnerRows.length).toBe(0);

      const addPartner = wrapper.find("#addPartnerButton");
      expect(addPartner.first().props().formAction).toBe("/partnership/partner-details");

      const ContinueButton = wrapper.find("ContinueButton");
      expect(ContinueButton.length).toBe(0);
    });
  });
    describe("1 partner PartnersTable table", () => {
        it("renders", () => {
          const wrapper = mount(
            <PartnerName
              validatorErrors={{error: ""}}
              cumulativeFullAnswers={{partners: ["one"] }}
              switches={testSwitches}
            />
          );
          const partnersTable = wrapper.find("PartnersTable");
          expect(partnersTable.length).toBe(1);

          const partnerRows = wrapper.find("AccessibleTableRow");
          expect(partnerRows.length).toBe(1);
    
          const addPartner = wrapper.find("#addPartnerButton");
          expect(addPartner.first().props().formAction).toBe("/partnership/partner-details");
    
          const ContinueButton = wrapper.find("ContinueButton");
          expect(ContinueButton.length).toBe(0);
        });
    });

    describe("2 partners PartnersTable table", () => {
        it("renders", () => {
          const wrapper = mount(
            <PartnerName
              validatorErrors={{error: ""}}
              cumulativeFullAnswers={{partners: ["one", "two"] }}
              switches={testSwitches}
            />
          );
          const partnersTable = wrapper.find("PartnersTable");
          expect(partnersTable.length).toBe(1);

          const partnerRows = wrapper.find("AccessibleTableRow");
          expect(partnerRows.length).toBe(2);
    
          const addPartner = wrapper.find("#addPartnerButton");
          expect(addPartner.first().props().formAction).toBe("/partnership/partner-details");
    
          const ContinueButton = wrapper.find("ContinueButton");
          expect(ContinueButton.length).toBe(1);
        });
    });

    describe("6 partners PartnersTable table", () => {
      it("renders", () => {
        const wrapper = mount(
          <PartnerName
            validatorErrors={{error: ""}}
            cumulativeFullAnswers={{partners: ["one", "two", "three", "four", "five"] }}
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
