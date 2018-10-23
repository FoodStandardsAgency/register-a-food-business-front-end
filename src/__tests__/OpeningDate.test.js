import OpeningDate from "../components/OpeningDate";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<OpeningDate />", () => {
  const testValidatorErrors = {
    example: "test error"
  };

  const testCumulativeAnswers = {
    example: "test answer"
  };

  const testSwitches = {};

  it("renders without crashing", () => {
    const wrapper = shallow(
      <OpeningDate
        cumulativeFullAnswers={testCumulativeAnswers}
        validatorErrors={testValidatorErrors}
        switches={testSwitches}
      />
    );
    expect(wrapper.length).toBe(1);
  });

  describe("when given 'Establishment is not trading yet'", () => {
    it("should render BackButton with 'establishment-opening-date-proactive' as originator prop", () => {
      const proactiveCumulativeAnswers = {
        establishment_opening_status: "Establishment is not trading yet"
      };
      const wrapper = mount(
        <OpeningDate
          cumulativeFullAnswers={proactiveCumulativeAnswers}
          validatorErrors={testValidatorErrors}
          switches={testSwitches}
        />
      );

      const backButton = wrapper.find("BackButton");
      expect(backButton.props().originator).toBe(
        "establishment-opening-date-proactive"
      );
    });
  });

  describe("when given anything else", () => {
    it("should render BackButton with 'establishment-opening-date-retroactive' as originator prop", () => {
      const proactiveCumulativeAnswers = {
        establishment_opening_status: "Another answer"
      };
      const wrapper = mount(
        <OpeningDate
          cumulativeFullAnswers={proactiveCumulativeAnswers}
          validatorErrors={testValidatorErrors}
          switches={testSwitches}
        />
      );

      const backButton = wrapper.find("BackButton");
      expect(backButton.props().originator).toBe(
        "establishment-opening-date-retroactive"
      );
    });
  });
});
