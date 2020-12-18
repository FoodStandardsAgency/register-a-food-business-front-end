import { BusinessTypeLookup } from "../components/BusinessTypeLookup";
import DataListSection from "../components/DataListSection";
import { Paragraph } from "govuk-react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils"; // ES6

describe("given JavaScript is disabled", () => {
  describe("when browser is not Safari or IE", () => {
    it("renders DataListSection", async () => {
      let wrapper;

      await act(async () => {
        wrapper = mount(
          <BusinessTypeLookup
            validatorErrors
            cumulativeFullAnswers
            browser="Chrome"
            t={(text) => text}
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
      it("should render Paragraph with appropriate text", () => {
        expect(wrapper.find(Paragraph).text()).toEqual(
          "Search with your own keywords and then select the most fitting business type from the suggestions"
        );
      });
      it("should render DataList component", () => {
        expect(wrapper.exists("datalist#business-types")).toBe(true);
      });
    });
  });
});
