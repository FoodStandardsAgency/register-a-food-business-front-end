import ProcessedErrorSummary from "../components/ProcessedErrorSummary";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";

const testValidatorErrorsExists = {
  example: "test error",
  example2: "test error 2"
};

const emptyValidatorErrors = {};

describe("<ProcessedErrorSummary />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <I18nextProvider i18n={i18n}>
        <ProcessedErrorSummary validatorErrors={testValidatorErrorsExists} />
      </I18nextProvider>
    );
    expect(wrapper.length).toBe(1);
  });

  it("returns null when validator errors is empty", () => {
    const wrapper = mount(
      <ProcessedErrorSummary validatorErrors={emptyValidatorErrors} />
    );
    expect(wrapper.instance()).toEqual(null);
  });

  it("should click on the error", () => {
    const mockOnHandleErrorClickCallback = jest.fn();

    const ProcessedErrorSummaryClick = () => (
      <ProcessedErrorSummary
        onHandleErrorClick={mockOnHandleErrorClickCallback}
        validatorErrors={testValidatorErrorsExists}
      />
    );

    const wrapperProcessedErrorSummaryClickMock = mount(
      <ProcessedErrorSummaryClick />
    );

    let timesClicked = 0;

    wrapperProcessedErrorSummaryClickMock
      .find("UnorderedList")
      .find("ListItem")
      .forEach((listItem) => {
        listItem.find("Anchor").simulate("click");
        timesClicked += 1;
        expect(mockOnHandleErrorClickCallback.mock.calls.length).toBe(
          timesClicked
        );
      });
  });
});
