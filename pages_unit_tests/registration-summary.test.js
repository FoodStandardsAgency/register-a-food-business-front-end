import RegistrationSummary from "../pages/registration-summary";
import { shallow, mount } from "enzyme";
import { transformAnswersForSummary } from "../src/server/services/data-transform.service";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";
jest.mock("../src/server/services/data-transform.service");

const cumulativeFullAnswers = {
  establishment_address_line_1: "Example address line 1"
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
        allValidationErrors={{}}
        switches={testSwitches}
      />
    );
    const establishmentFirstLine = wrapper.props().cumulativeFullAnswers
      .establishment_address_line_1;
    expect(establishmentFirstLine).toBe("Example address line 1");
  });

  describe("SummaryTable component", () => {
    transformAnswersForSummary.mockImplementation(() => ({ test: "answer" }));

    it("renders", () => {
      const wrapper = mount(
        <RegistrationSummary
          cumulativeFullAnswers={cumulativeFullAnswers}
          allValidationErrors={{}}
          switches={testSwitches}
        />
      );
      const summaryTable = wrapper.find("SummaryTable");
      expect(summaryTable.length).toBe(1);
    });
  });
});
