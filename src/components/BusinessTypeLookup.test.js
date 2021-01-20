import { BusinessTypeLookup } from "../components/BusinessTypeLookup";
import { Paragraph } from "govuk-react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils"; // ES6

describe("<BusinessTypeLookup />", () => {
  it("renders without crashing", async () => {
    let wrapper;
    await act(async () => {
      wrapper = shallow(
        <BusinessTypeLookup
          validatorErrors
          cumulativeFullAnswers
          t={(text) => text}
        />
      );
    });
    expect(wrapper.length).toBe(1);
  });

  describe("given validatorErrors.business_type", () => {
    it("renders the container div with different styling", async () => {
      let wrapperNoErrors;
      await act(async () => {
        wrapperNoErrors = shallow(
          <BusinessTypeLookup
            validatorErrors={{}}
            cumulativeFullAnswers
            t={(text) => text}
          />
        );
      });
      const appliedClassNameNoErrors = wrapperNoErrors
        .find("#autocompleteContainer")
        .prop("className");

      let wrapperErrors;
      await act(async () => {
        wrapperErrors = shallow(
          <BusinessTypeLookup
            validatorErrors={{ business_type: "An error" }}
            cumulativeFullAnswers
            t={(text) => text}
          />
        );
      });

      const appliedClassNameErrors = wrapperErrors
        .find("#autocompleteContainer")
        .prop("className");
      expect(appliedClassNameNoErrors).not.toEqual(appliedClassNameErrors);
    });
  });
  describe("given JavaScript is enabled", () => {
    let wrapper;
    beforeEach(async () => {
      await act(async () => {
        wrapper = mount(
          <BusinessTypeLookup
            validatorErrors
            cumulativeFullAnswers
            t={(text) => text}
          />
        );
        wrapper.setState({ renderAutoCompleteSection: true });
        wrapper.update();
      });
    });

    it("should render Paragraph with appropriate text", () => {
      expect(wrapper.find(Paragraph).text()).toEqual(
        "Search with your own keywords and then select the most fitting business type from the suggestions"
      );
    });
    it("should render Autocomplete component", () => {
      expect(wrapper.exists("div#autocompleteContainer")).toBe(true);
    });
  });
});
