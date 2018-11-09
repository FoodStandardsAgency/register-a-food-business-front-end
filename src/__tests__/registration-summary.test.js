import RegistrationSummary from "../../pages/registration-summary";
import { shallow, mount } from "enzyme";
import { transformAnswersForSummary } from "../server/services/data-transform.service";
jest.mock("../server/services/data-transform.service");

const cumulativeFullAnswers = {
  establishment_first_line: "Example first line"
};

const testSwitches = {};

describe("<RegistrationSummary />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<RegistrationSummary />);
    expect(wrapper.length).toBe(1);
  });

  it("gets given props", () => {
    const wrapper = mount(
      <RegistrationSummary
        cumulativeFullAnswers={cumulativeFullAnswers}
        switches={testSwitches}
      />
    );
    const establishmentFirstLine = wrapper.props().cumulativeFullAnswers
      .establishment_first_line;
    expect(establishmentFirstLine).toBe("Example first line");
  });

  describe("SummaryTable component", () => {
    transformAnswersForSummary.mockImplementation(() => ({ test: "answer" }));

    it("renders", () => {
      const wrapper = mount(
        <RegistrationSummary
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const summaryTable = wrapper.find("SummaryTable");
      expect(summaryTable.length).toBe(1);
    });
  });
});
