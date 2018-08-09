import BusinessTypeLookup from "../components/BusinessTypeLookup";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<BusinessTypeLookup />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <BusinessTypeLookup validatorErrors cumulativeAnswers />
    );
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer
      .create(<BusinessTypeLookup validatorErrors cumulativeAnswers />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe("given validatorErrors.business_type", () => {
    it("renders the top-level div with errorStyling className and renders the ErrorText component", () => {
      const wrapper = shallow(
        <BusinessTypeLookup
          validatorErrors={{ business_type: "An error" }}
          cumulativeAnswers
        />
      );
      const topLevelDivWithClassName = wrapper.find("div.errorStyling");
      expect(topLevelDivWithClassName.length).toBe(1);

      const errorTextComponent = wrapper.find("Styled(ErrorText)");
      expect(errorTextComponent.length).toBe(1);
    });
  });
});

describe("Function:suggest", () => {});
