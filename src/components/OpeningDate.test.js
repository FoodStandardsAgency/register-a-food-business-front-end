import OpeningDate from "../components/OpeningDate";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";

describe("<OpeningDate />", () => {
  const testValidatorErrors = {
    example: "test error"
  };

  const testCumulativeAnswers = {
    example: "test answer"
  };

  const testSwitches = {};

  it("renders without crashing", () => {
    const wrapper = shallow(
      <OpeningDate
        cumulativeFullAnswers={testCumulativeAnswers}
        validatorErrors={testValidatorErrors}
        switches={testSwitches}
      />
    );
    expect(wrapper.length).toBe(1);
  });

  describe("when given 'establishment-opening-date-proactive' as the current page", () => {
    let wrapper;

    beforeEach(() => {
      const cumulativeAnswersProactive = {
        establishment_opening_status: "Establishment due to trade",
        day: "01",
        month: "01",
        year: "2050"
      };
      wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OpeningDate
            currentPage="establishment-opening-date-proactive"
            cumulativeFullAnswers={cumulativeAnswersProactive}
            validatorErrors={testValidatorErrors}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
    });

    it("should render BackButton with 'establishment-opening-date-proactive' as the currentPage prop", () => {
      const backButton = wrapper.find("BackButton");
      expect(backButton.props().currentPage).toBe(
        "establishment-opening-date-proactive"
      );
    });

    it("should display the values in the corresponding fields", () => {
      const dayInputValue = wrapper.find(`input[name="day"]`).props()
        .defaultValue;
      const monthInputValue = wrapper.find(`input[name="month"]`).props()
        .defaultValue;
      const yearInputValue = wrapper.find(`input[name="year"]`).props()
        .defaultValue;
      expect(dayInputValue).toBe("01");
      expect(monthInputValue).toBe("01");
      expect(yearInputValue).toBe("2050");
    });
  });

  describe("when given 'establishment-opening-date-retroactive' as the current page", () => {
    let wrapper;

    beforeEach(() => {
      const cumulativeAnswersRetroactive = {
        establishment_opening_status: "Establishment is already trading",
        day: "07",
        month: "08",
        year: "1998"
      };
      wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <OpeningDate
            currentPage="establishment-opening-date-retroactive"
            cumulativeFullAnswers={cumulativeAnswersRetroactive}
            validatorErrors={testValidatorErrors}
            switches={testSwitches}
          />
        </I18nextProvider>
      );
    });

    it("should render BackButton with 'establishment-opening-date-retroactive' as currentPage prop", () => {
      const backButton = wrapper.find("BackButton");
      expect(backButton.props().currentPage).toBe(
        "establishment-opening-date-retroactive"
      );
    });

    it("should display the values in the corresponding fields", () => {
      const dayInputValue = wrapper.find(`input[name="day"]`).props()
        .defaultValue;
      const monthInputValue = wrapper.find(`input[name="month"]`).props()
        .defaultValue;
      const yearInputValue = wrapper.find(`input[name="year"]`).props()
        .defaultValue;
      expect(dayInputValue).toBe("07");
      expect(monthInputValue).toBe("08");
      expect(yearInputValue).toBe("1998");
    });
  });
});
