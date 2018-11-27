import BusinessTypeLookup from "../components/BusinessTypeLookup";
import { shallow } from "enzyme";

describe("<BusinessTypeLookup />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <BusinessTypeLookup validatorErrors cumulativeFullAnswers />
    );
    expect(wrapper.length).toBe(1);
  });

  describe("given validatorErrors.business_type", () => {
    it("renders the container div with different styling", () => {
      const wrapperNoErrors = shallow(
        <BusinessTypeLookup validatorErrors={{}} cumulativeFullAnswers />
      );
      const appliedClassNameNoErrors = wrapperNoErrors
        .find("#autocompleteContainer")
        .prop("className");
      const wrapperErrors = shallow(
        <BusinessTypeLookup
          validatorErrors={{ business_type: "An error" }}
          cumulativeFullAnswers
        />
      );
      const appliedClassNameErrors = wrapperErrors
        .find("#autocompleteContainer")
        .prop("className");

      expect(appliedClassNameNoErrors).not.toEqual(appliedClassNameErrors);
    });
  });
});
