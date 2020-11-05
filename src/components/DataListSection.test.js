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

      it('check that the class name is different with and without errors',async () =>{

        const wrapperNoErrors = wrapper.find('input').prop('className')
        let wrapperWithErrors;
        await act(async () => {
          wrapperWithErrors = mount(
            <DataListSection
              validatorErrors={{ business_type: 'An error' }}
              cumulativeFullAnswers
            />
          );
        });
        
        const wrapperErrors = wrapperWithErrors.find('input').prop('className')
        expect(wrapperNoErrors).not.toEqual(wrapperErrors)
      })

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

  