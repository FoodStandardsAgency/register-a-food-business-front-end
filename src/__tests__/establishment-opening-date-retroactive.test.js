import EstablishmentOpeningDateRetroactive from "../../pages/establishment-opening-date-retroactive";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

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
        cumulativeAnswers={testCumulativeAnswers}
        switches={testSwitches}
      />
    );
    const openingDateProactive = wrapper.find("OpeningDate");
    expect(openingDateProactive.length).toBe(1);
    expect(openingDateProactive.props().cumulativeAnswers.example).toBe(
      "test answer"
    );
    expect(openingDateProactive.props().validatorErrors.example).toBe(
      "test error"
    );
  });
});
