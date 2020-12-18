import PrimaryPartner from "../pages/main-partnership-contact";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

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
      <I18nextProvider i18n={i18n}>
        <PrimaryPartner
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={{ partners: threeRadioOptions.partners }}
          switches={testSwitches}
        />
      </I18nextProvider>
    );
    const radioOptions = wrapper.find("Radio");
    expect(radioOptions.length).toBe(3);
  });

  it("renders 4 radio buttons", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <PrimaryPartner
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={{ partners: fourRadioOptions.partners }}
          switches={testSwitches}
        />
      </I18nextProvider>
    );
    const radioOptions = wrapper.find("Radio");
    expect(radioOptions.length).toBe(4);
  });
});

describe("when main partnership contact is set", () => {
  it("is selected by default", () => {
    let i = 0;
    for (let id in fourRadioOptions.partners) {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <PrimaryPartner
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={{
              main_partnership_contact: fourRadioOptions.partners[id],
              partners: fourRadioOptions.partners
            }}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
      const registrationRoleRadio = wrapper.find(`Radio#partner-${i}`);
      expect(registrationRoleRadio.props().defaultChecked).toBe(true);
      i++;
    }
  });
});
