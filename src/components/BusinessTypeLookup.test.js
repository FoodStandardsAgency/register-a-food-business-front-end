import BusinessTypeLookup from "../components/BusinessTypeLookup";
// import DataListSection from "../components/DataListSection";
// import SelectListSection from "../components/SelectListSection";
// import { Paragraph } from "govuk-react";
// import { SelectInput } from "@govuk-react/select";
import { shallow } from "enzyme";
import { act } from "react-dom/test-utils"; // ES6

describe("<BusinessTypeLookup />", () => {
    it("renders without crashing", async () => {
        let wrapper;
        await act(async () => {
            wrapper = shallow(
                <BusinessTypeLookup validatorErrors cumulativeFullAnswers />
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
                    />
                );
            });

            const appliedClassNameErrors = wrapperErrors
                .find("#autocompleteContainer")
                .prop("className");

            expect(appliedClassNameNoErrors).not.toEqual(
                appliedClassNameErrors
            );
        });
    });

    /*
  describe("given JavaScript is enabled", () => {
    let wrapper;
    beforeEach(async () => {
      await act(async () => {
        wrapper = mount(
            <BusinessTypeLookup validatorErrors cumulativeFullAnswers/>
        );
      });
    });

    it("should render Paragraph with appropriate text", () => {
      console.log(wrapper.debug());
      expect(wrapper.find(Paragraph).text()).toEqual(
        "Search with your own keywords and then select the most fitting business type from the suggestions"
      );
    });
    it("should render Autocomplete component", () => {
      expect(wrapper.exists("div#autocompleteContainer")).toBe(true);
    });
  });
  */
    /*
  describe("given JavaScript is disabled", () => {
    /*
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
        console.log(wrapper.debug());

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
            "Search and select the most fitting business type from the suggestions"
          );
        });
        it("should render DataList component", () => {
          expect(wrapper.exists("datalist#business-types")).toBe(true);
        });
      });
    });
    /*
     */
    /*
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

        it("should render Paragraph with appropriate text", () => {
          expect(wrapper.find(Paragraph).text()).toEqual(
            "Select the most fitting business type from the suggestions"
          );
        });
        it("should render SelectInput component", () => {
          expect(wrapper.find(SelectInput).prop("name")).toBe("business_type");
        });
      });
    });
    */
    //  });
});
