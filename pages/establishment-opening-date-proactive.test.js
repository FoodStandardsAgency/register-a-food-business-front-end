import EstablishmentOpeningDateProactive from "./establishment-opening-date-proactive";
import { shallow, mount } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<EstablishmentOpeningDateProactive />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentOpeningDateProactive />);
    expect(wrapper.length).toBe(1);
  });

  it("renders OpeningDate component with correct error props and cumulative answers", () => {
    const wrapper = mount(
      <EstablishmentOpeningDateProactive
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
