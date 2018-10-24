import OpeningDate from "../components/OpeningDate";
import { shallow, mount } from "enzyme";
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

  describe("when given 'establishment-opening-date-proactive' as the current page", () => {
    it("should render BackButton with 'establishment-opening-date-proactive' as the currentPage prop", () => {
      const wrapper = mount(
        <OpeningDate
          currentPage="establishment-opening-date-proactive"
          cumulativeFullAnswers={testCumulativeAnswers}
          validatorErrors={testValidatorErrors}
          switches={testSwitches}
        />
      );

      const backButton = wrapper.find("BackButton");
      expect(backButton.props().currentPage).toBe(
        "establishment-opening-date-proactive"
      );
    });
  });

  describe("when given 'establishment-opening-date-retroactive' as the current page", () => {
    it("should render BackButton with 'establishment-opening-date-retroactive' as currentPage prop", () => {
      const wrapper = mount(
        <OpeningDate
          currentPage="establishment-opening-date-retroactive"
          cumulativeFullAnswers={testCumulativeAnswers}
          validatorErrors={testValidatorErrors}
          switches={testSwitches}
        />
      );

      const backButton = wrapper.find("BackButton");
      expect(backButton.props().currentPage).toBe(
        "establishment-opening-date-retroactive"
      );
    });
  });
});
