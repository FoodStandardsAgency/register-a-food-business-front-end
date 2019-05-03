import PrimaryPartner from "../pages/main-partnership-contact";
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
        cumulativeFullAnswers={{partners: threeRadioOptions.partners}}
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
        cumulativeFullAnswers={{partners: fourRadioOptions.partners}}
        switches={testSwitches}
      />
    );
    const radioOptions = wrapper.find("Radio");
    expect(radioOptions.length).toBe(4);
  });
});

describe("all Radio buttons", () => {
  it("can be selected by default", () => {
    let i =0;
    for (let id in fourRadioOptions.partners) {
      const wrapper = mount(
        <PrimaryPartner
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={{
            main_partnership_contact: fourRadioOptions.partners[id],
            partners: fourRadioOptions.partners
          }}
          switches={testSwitches}
        />
      );
      const registrationRoleRadio = wrapper.find(
        `Radio#partner-${i}`
      );
      expect(registrationRoleRadio.props().defaultChecked).toBe(true);
      i++;
    }
  });
});
