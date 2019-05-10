import PartnerDetails from "../pages/partner-details";
import { shallow, mount } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  partners: [],
  targetPartner: ""
};

const testSwitches = {};

describe("<PartnerDetails />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<PartnerDetails />);
    expect(wrapper.length).toBe(1);
  });

  describe("partnername input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <PartnerDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const partnerName = wrapper.find("InputField#partner_name");
      expect(partnerName.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        partnerName: "test error"
      };
      const wrapper = mount(
        <PartnerDetails
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const partnerName = wrapper.find("InputField#partner_name");
      expect(partnerName.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        partners: ["one"],
        targetPartner: "0"
      };
      const wrapper = mount(
        <PartnerDetails
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const partnerName = wrapper.find("InputField#partner_name");
      expect(partnerName.props().input.defaultValue).toBe("one");
    });
  });
});