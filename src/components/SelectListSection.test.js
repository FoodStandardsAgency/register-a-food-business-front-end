import BusinessTypeLookup from "../components/BusinessTypeLookup";
import SelectListSection from "../components/SelectListSection";
import { Label } from "govuk-react";
import { SelectInput } from "@govuk-react/select";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils"; // ES6

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
