import PrimaryPartner from "../pages/partner-primary-contact";
import { shallow, mount } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testSwitches = {};

const threeRadioOptions = {
  partners: ["One", "Two", "Three"]
};

const fourRadioOptions = {
  partners: ["One", "Two", "Three", "Four"]
};

describe("<PrimaryPartner />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<PrimaryPartner />);
    expect(wrapper.length).toBe(1);
  });

  it("renders 3 radio buttons", () => {
    const wrapper = mount(
      <PrimaryPartner
        validatorErrors={testValidatorErrors}
        cumulativeFullAnswers={threeRadioOptions}
        switches={testSwitches}
      />
    );
    const radioOptions = wrapper.find("Radio");
    expect(radioOptions.length).toBe(3);
  });

  it("renders 4 radio buttons", () => {
    const wrapper = mount(
      <PrimaryPartner
        validatorErrors={testValidatorErrors}
        cumulativeFullAnswers={fourRadioOptions}
        switches={testSwitches}
      />
    );
    const radioOptions = wrapper.find("Radio");
    expect(radioOptions.length).toBe(4);
  });
});

describe("all Radio buttons", () => {
  it("can be selected by default", () => {
    for (let id in fourRadioOptions.partners) {
      const wrapper = mount(
        <PrimaryPartner
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={{
            primary_partner: fourRadioOptions.partners[id],
            partners: fourRadioOptions.partners
          }}
          switches={testSwitches}
        />
      );
      const registrationRoleRadio = wrapper.find(
        `Radio#${fourRadioOptions.partners[id]}`
      );
      expect(registrationRoleRadio.props().defaultChecked).toBe(true);
    }
  });
});
