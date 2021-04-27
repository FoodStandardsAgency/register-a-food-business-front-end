import SubmissionErrorSummary from "./SubmissionErrorSummary";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";

const testSubmissionErrorsExists = ["test error", "test error 2"];

const emptySubmissionErrors = [];

describe("<SubmissionErrorSummary />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <I18nextProvider i18n={i18n}>
        <SubmissionErrorSummary submissionErrors={testSubmissionErrorsExists} />
      </I18nextProvider>
    );
    expect(wrapper.length).toBe(1);
  });

  it("returns null when validator errors is empty", () => {
    const wrapper = mount(
      <SubmissionErrorSummary submissionErrors={emptySubmissionErrors} />
    );
    expect(wrapper.instance()).toEqual(null);
  });
});
