import SubmissionErrorSummary from "./SubmissionErrorSummary";
import { shallow, mount } from "enzyme";

const testSubmissionErrorsExists = ["test error", "test error 2"];

const emptySubmissionErrors = {};

describe("<SubmissionErrorSummary />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <SubmissionErrorSummary submissionErrors={testSubmissionErrorsExists} />
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
