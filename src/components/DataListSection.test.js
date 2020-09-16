import BusinessTypeLookup from "../components/BusinessTypeLookup";
import DataListSection from "../components/DataListSection";
import { Label } from "govuk-react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils"; // ES6

describe("given browser is IE", () => {
  it("renders DataListSection", async () => {
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <BusinessTypeLookup
          validatorErrors
          cumulativeFullAnswers
          browser="IE"
        />
      );
      wrapper.setState({ renderAutoCompleteSection: true });
      wrapper.update();
    });

    expect(wrapper.find(DataListSection)).toHaveLength(1);
  });
});
describe("given JavaScript is disabled", () => {
  describe("when browser is not Safari", () => {
    it("renders DataListSection", async () => {
      let wrapper;

      await act(async () => {
        wrapper = mount(
          <BusinessTypeLookup
            validatorErrors
            cumulativeFullAnswers
            browser="Chrome"
          />
        );
        wrapper.setState({ renderAutoCompleteSection: false });
        wrapper.update();
      });

      expect(wrapper.find(DataListSection)).toHaveLength(1);
    });
    describe("when DataListSection renders", () => {
      let wrapper;

      beforeEach(async () => {
        await act(async () => {
          wrapper = mount(
            <DataListSection
              validatorErrors
              cumulativeFullAnswers
              browser="Chrome"
            />
          );
        });
      });
      it("should render Label with appropriate text", () => {
        expect(
          wrapper
            .find(Label)
            .text()
            .includes(
              "Search and select the most fitting business type from the suggestions"
            )
        ).toBe(true);
      });
      it("should render DataList component", () => {
        expect(wrapper.exists("datalist#business-types")).toBe(true);
      });
    });
  });
});
