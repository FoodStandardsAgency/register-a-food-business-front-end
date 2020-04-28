import BusinessTypeLookup from "../components/BusinessTypeLookup";
import { Paragraph } from "govuk-react";
import { SelectInput } from "@govuk-react/select";
import { shallow, mount } from "enzyme";

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
                <BusinessTypeLookup
                    validatorErrors={{}}
                    cumulativeFullAnswers
                />
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

            expect(appliedClassNameNoErrors).not.toEqual(
                appliedClassNameErrors
            );
        });
    });
    describe("given JavaScript is enabled", () => {
        const wrapper = mount(
            <BusinessTypeLookup validatorErrors cumulativeFullAnswers />
        );
        it("should render Paragraph with appropriate text", () => {
            expect(wrapper.find(Paragraph).text()).toEqual(
                "Search with your own keywords and then select the most fitting business type from the suggestions"
            );
        });
        it("should render Autocomplete component", () => {
            expect(wrapper.exists("div#autocompleteContainer")).toBe(true);
        });
    });
    describe("given JavaScript is disabled", () => {
        describe("when browser is not Safari", () => {
            let wrapper;

            beforeEach(() => {
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
            it("should render Paragraph with appropriate text", () => {
                expect(wrapper.find(Paragraph).text()).toEqual(
                    "Search and select the most fitting business type from the suggestions"
                );
            });
            it("should render Datalist component", () => {
                expect(wrapper.exists("datalist#business-types")).toBe(true);
            });
        });
        describe("when browser is not Safari and there are validation errors", () => {
            let wrapper;

            beforeEach(() => {
                const validationError = {
                    business_type: "invalid business type"
                };

                wrapper = mount(
                    <BusinessTypeLookup
                        validatorErrors={validationError}
                        cumulativeFullAnswers
                        browser="Chrome"
                    />
                );
                wrapper.setState({ renderAutoCompleteSection: false });
                wrapper.update();
            });
            it("should render Paragraph with appropriate text", () => {
                expect(wrapper.find(Paragraph).text()).toEqual(
                    "Search and select the most fitting business type from the suggestions"
                );
            });
            it("should render Datalist component", () => {
                expect(wrapper.exists("datalist#business-types")).toBe(true);
            });
        });
        describe("when browser is Safari", () => {
            let wrapper;

            beforeEach(() => {
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
            it("should render Paragraph with appropriate text", () => {
                expect(wrapper.find(Paragraph).text()).toEqual(
                    "Select the most fitting business type from the suggestions"
                );
            });
            it("should render SelectInput component", () => {
                expect(wrapper.find(SelectInput).prop("name")).toBe(
                    "business_type"
                );
            });
            it("should not set autocompleteErrorStyling", () => {
                expect(wrapper.find(SelectInput).prop("className")).toBe(null);
            });
        });
        describe("when browser is Safari and there are validation errors", () => {
            let wrapper;

            beforeEach(() => {
                const validationError = {
                    business_type: "invalid business type"
                };

                wrapper = mount(
                    <BusinessTypeLookup
                        validatorErrors={validationError}
                        cumulativeFullAnswers
                        browser="Safari"
                    />
                );
                wrapper.setState({ renderAutoCompleteSection: false });
                wrapper.update();
            });
            it("should render Paragraph with appropriate text", () => {
                expect(wrapper.find(Paragraph).text()).toEqual(
                    "Select the most fitting business type from the suggestions"
                );
            });
            it("should render SelectInput component", () => {
                expect(wrapper.find(SelectInput).prop("name")).toBe(
                    "business_type"
                );
            });
            it("should set autocompleteErrorStyling", () => {
                expect(wrapper.find(SelectInput).prop("className")).not.toBe(
                    null
                );
            });
        });
    });
});
