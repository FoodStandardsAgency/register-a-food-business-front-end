import EstablishmentOpeningDateRetroactive from "../pages/establishment-opening-date-retroactive";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<EstablishmentOpeningDateRetroactive />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentOpeningDateRetroactive />);
    expect(wrapper.length).toBe(1);
  });

  it("renders OpeningDate component with correct error props and cumulative answers", () => {
    const wrapper = mount(
      <EstablishmentOpeningDateRetroactive
        validatorErrors={testValidatorErrors}
        cumulativeFullAnswers={testCumulativeAnswers}
        switches={testSwitches}
      />
    );
    const openingDateProactive = wrapper.find("OpeningDate");
    expect(openingDateProactive.length).toBe(1);
    expect(openingDateProactive.props().cumulativeFullAnswers.example).toBe(
      "test answer"
    );
    expect(openingDateProactive.props().validatorErrors.example).toBe(
      "test error"
    );
  });
});
