import BusinessTypeLookup from "../components/BusinessTypeLookup";
import SelectListSection from "../components/SelectListSection";
import { Label } from "govuk-react";
import { SelectInput } from "@govuk-react/select";
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

    expect(wrapper.find(SelectListSection)).toHaveLength(1);
  });
});
describe("given JavaScript is disabled", () => {
  describe("when browser is Safari", () => {
    it("renders SelectListSection", async () => {
      let wrapper;
      await act(async () => {
        wrapper = mount(
          <BusinessTypeLookup
            validatorErrors
            cumulativeFullAnswers
            browser="Safari"
          />
        );
        wrapper.setState({ renderAutoCompleteSection: false });
        wrapper.update();
      });

      expect(wrapper.find(SelectListSection)).toHaveLength(1);
    });
    describe("when SelectList component renders", () => {
      let wrapper;

      beforeEach(async () => {
        await act(async () => {
          wrapper = mount(
            <SelectListSection
              validatorErrors
              cumulativeFullAnswers
              browser="Safari"
            />
          );
        });
      });

      it("check that className is different with and without an error", async () =>{
        const wrapperNoErrors = wrapper.find(SelectInput).prop("className");

        let wrapperWithErrors; 

        await act(async () => {
          wrapperWithErrors = mount(
            <SelectListSection
              validatorErrors={{ business_type: 'An error' }}
              cumulativeFullAnswers
              browser="Safari"
            />
          );
        });
        const wrapperErrors = wrapperWithErrors.find(SelectInput).prop("className");

        expect(wrapperNoErrors).not.toBe(wrapperErrors);
      });

      it("should render Label with appropriate text", () => {
        expect(
          wrapper
            .find(Label)
            .text()
            .includes(
              "Select the most fitting business type from the suggestions"
            )
        ).toBe(true);
      });
      it("should render SelectInput component", () => {
        expect(wrapper.find(SelectInput).prop("name")).toBe("business_type");
      });
    });
  });
});
