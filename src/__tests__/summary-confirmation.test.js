import ApplicationComplete from "../../pages/summary-confirmation";
import { shallow, mount } from "enzyme";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";
import { transformAnswersForSummary } from "../server/services/data-transform.service";
jest.mock("../server/services/data-transform.service");
expect.addSnapshotSerializer(createSerializer(emotion));

const cumulativeAnswers = {
  establishment_first_line: "Example first line"
};

const emailFbo = { success: true, recipient: "fbo@email.com" };

const lcConfigCombined = {
  hygieneAndStandards: {
    local_council: "Council name",
    local_council_email: "council@example.com"
  }
};

const lcConfigSplit = {
  hygiene: {
    local_council: "Hygiene council name",
    local_council_email: "hygiene@example.com"
  },
  standards: {
    local_council: "Standards council name",
    local_council_email: "standards@example.com"
  }
};

describe("<ApplicationComplete />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ApplicationComplete />);
    expect(wrapper.length).toBe(1);
  });

  describe("SummaryTable component", () => {
    it("Gets given transformedAnswers ", () => {
      transformAnswersForSummary.mockImplementation(() => ({ test: "answer" }));
      const wrapper = mount(
        <ApplicationComplete
          cumulativeAnswers={cumulativeAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigCombined}
          emailFbo={emailFbo}
        />
      );
      const summaryTable = wrapper.find("SummaryTable");
      expect(summaryTable.props().test).toBe("answer");
    });
    it("renders", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeAnswers={cumulativeAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigCombined}
          emailFbo={emailFbo}
        />
      );
      const summaryTable = wrapper.find("SummaryTable");
      expect(summaryTable.length).toBe(1);
    });
  });

  describe("When given fsaRegistrationNumber", () => {
    it("The panel renders the number when defined", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeAnswers={cumulativeAnswers}
          applicationCompletePage={true}
          fsaRegistrationNumber="12345"
          lcConfig={lcConfigCombined}
          emailFbo={emailFbo}
        />
      );
      const panel = wrapper.find("Panel#panelWithNumber");
      expect(panel.length).toBe(1);
    });
    it("The panel renders 'Awaiting registration number' text when not defined", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeAnswers={cumulativeAnswers}
          applicationCompletePage={true}
          fsaRegistrationNumber={undefined}
          lcConfig={lcConfigCombined}
          emailFbo={emailFbo}
        />
      );
      const panel = wrapper.find("Panel#panelWithText");
      expect(panel.length).toBe(1);
    });
  });

  describe("When given a split lcConfig", () => {
    it("The panel renders two sets of LC info", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeAnswers={cumulativeAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigSplit}
          emailFbo={lcConfigSplit}
        />
      );
      const text = wrapper.text();
      expect(text.includes("Hygiene council name")).toBe(true);
      expect(text.includes("Standards council name")).toBe(true);
      expect(text.includes("hygiene@example.com")).toBe(true);
      expect(text.includes("standards@example.com")).toBe(true);
    });
  });
});
