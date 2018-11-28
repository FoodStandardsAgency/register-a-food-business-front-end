import ApplicationComplete from "../pages/summary-confirmation";
import { shallow, mount } from "enzyme";
jest.mock("../src/server/services/data-transform.service");

const cumulativeFullAnswers = {
  establishment_first_line: "Example first line"
};

const transformedData = { operator_email: "email@email.com" };

const lcConfigCombined = {
  hygieneAndStandards: {
    local_council: "Council name",
    local_council_email: "council@example.com",
    local_council_phone_number: "123456789"
  }
};

const lcConfigCombinedNoNumber = {
  hygieneAndStandards: {
    local_council: "Council name",
    local_council_email: "council@example.com"
  }
};

const lcConfigSplit = {
  hygiene: {
    local_council: "Hygiene council name",
    local_council_email: "hygiene@example.com",
    local_council_phone_number: "123456789"
  },
  standards: {
    local_council: "Standards council name",
    local_council_email: "standards@example.com",
    local_council_phone_number: "123456789"
  }
};

const lcConfigSplitNoNumber = {
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
    it("renders", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigCombined}
          transformedData={transformedData}
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
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          fsaRegistrationNumber="12345"
          lcConfig={lcConfigCombined}
          transformedData={transformedData}
        />
      );
      const panel = wrapper.find("Panel#panelWithNumber");
      expect(panel.length).toBe(1);
    });
    it("The panel renders 'Awaiting registration number' text when not defined", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          fsaRegistrationNumber={undefined}
          lcConfig={lcConfigCombined}
          transformedData={transformedData}
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
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigSplit}
          transformedData={transformedData}
        />
      );
      const text = wrapper.find("#sentToCouncilsSection").text();
      expect(text.includes("Hygiene council name")).toBe(true);
      expect(text.includes("Standards council name")).toBe(true);
      expect(text.includes("hygiene@example.com")).toBe(true);
      expect(text.includes("standards@example.com")).toBe(true);
    });
  });

  describe("When given a hygieneAndStandards phone number", () => {
    it("The paragraph renders displaying it", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigCombined}
          transformedData={transformedData}
        />
      );
      const panel = wrapper.find("Paragraph#hygieneAndStandardsNumber");
      expect(panel.length).toBe(1);
    });
  });

  describe("When given a hygiene phone number", () => {
    it("The paragraph renders displaying it", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigSplit}
          transformedData={transformedData}
        />
      );
      const panel = wrapper.find("Paragraph#hygieneNumber");
      expect(panel.length).toBe(1);
    });
  });

  describe("When given a standards phone number", () => {
    it("The paragraph renders displaying it", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigSplit}
          transformedData={transformedData}
        />
      );
      const panel = wrapper.find("Paragraph#standardsNumber");
      expect(panel.length).toBe(1);
    });
  });

  describe("When given a contact representative email", () => {
    it("The paragraph renders displaying it", () => {
      const transformedDataRepresentative = {
        contact_representative_email: "rep@email.com"
      };
      const wrapper = mount(
        <ApplicationComplete
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigSplit}
          transformedData={transformedDataRepresentative}
        />
      );
      const panel = wrapper.find("Paragraph.receiveConfirmationEmail");
      expect(panel.text().includes("rep@email.com")).toBe(true);
    });
  });

  describe("When not given a hygieneAndStandards phone number", () => {
    it("The hygieneAndStandards phone number does not render", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigCombinedNoNumber}
          transformedData={transformedData}
        />
      );
      const panel = wrapper.find("Paragraph#hygieneAndStandardsNumber");
      expect(panel.length).toBe(0);
    });
  });

  describe("When not given a hygiene phone number", () => {
    it("The hygiene phone number does not render", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigSplitNoNumber}
          transformedData={transformedData}
        />
      );
      const panel = wrapper.find("Paragraph#hygieneNumber");
      expect(panel.length).toBe(0);
    });
  });

  describe("When not given a standards phone number", () => {
    it("The standards phone number does not render", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          lcConfig={lcConfigSplitNoNumber}
          transformedData={transformedData}
        />
      );
      const panel = wrapper.find("Paragraph#standardsNumber");
      expect(panel.length).toBe(0);
    });
  });

  describe("When given no lcConfig", () => {
    it("The page still renders", () => {
      const wrapper = mount(
        <ApplicationComplete
          cumulativeFullAnswers={cumulativeFullAnswers}
          applicationCompletePage={true}
          lcConfig={{}}
          transformedData={transformedData}
        />
      );
      expect(wrapper.length).toBe(1);
    });
  });
});