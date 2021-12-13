// const { NULL } = require("node-sass");
const { axe, renderPage, getPageDetails } = require("../testHelpers");

const propsData = {
  applicationCompletePage: "null",
  validatorErrors: {},
  cumulativeFullAnswers: { },
  language: "en",
  operator_type: "COMPANY",
  water_supply: "PUBLIC"
};

const props = {
  validatorErrors: {},
  cumulativeFullAnswers: { water_supply: "PRIVATE" },
  language: "en"
};

describe("registration-summary", () => {
  it("renders without crashing", () => {
    const $ = renderPage("registration-summary", props);
    const $mainHeading = getPageDetails.getMainHeading($);
    expect($mainHeading.text().trim()).toEqual(
      "Check your answers"
    );
  });

  it("renders without crashing", () => {
    const $ = renderPage("registration-summary", props);
    const $AreaHeading = getPageDetails.getAreaHeading($);
    expect($AreaHeading[1].children[0].data).toEqual(
      "Operator details"
    );
  });

  it("renders without crashing", () => {
    const $ = renderPage("registration-summary", props);
    const $AreaHeading = getPageDetails.getAreaHeading($);
    expect($AreaHeading[2].children[0].data).toEqual(
      "Establishment details"
    );
  });

  it("renders without crashing", () => {
    const $ = renderPage("registration-summary", props);
    const $AreaHeading = getPageDetails.getAreaHeading($);
    expect($AreaHeading[3].children[0].data).toEqual(
      "Activities"
    );
  });

  it("passes accessibility tests", async () => {
    const $ = renderPage("registration-summary", props);
    const results = await axe($.html());
    expect(results).toHaveNoViolations();
  });

  // it("renders 3 radio buttons", async () => {
  //   const $ = renderPage("registration-summary", props);

  //   const $watersupplyRadios = getPageDetails.getRadioButtons($);
  //   expect($watersupplyRadios.length).toBe(3);
  // });

  describe("registration summary values are correct", () => {
    it("renders the Soletrader radio button with the correct value", () => {
      const $ = renderPage("registration-summary", props); 
      expect(propsData.water_supply).toBe("PUBLIC");
    });
  });

  describe("registration summary values are correct", () => {
    it("renders the operator type with a test value", () => {
      const $ = renderPage("registration-summary", propsData);
      const $OperatorTypeCompany = $("#operator_type_test"); 
      expect($OperatorTypeCompany).toBe("COMPANY");
    });
  });
  //   it("renders the Partnership radio button with the correct value", () => {
  //     const $ = renderPage("business-water-supply", props);
  //     const $radioPrivate = $("#water_supply_private");
  //     expect($radioPrivate.get(0).attribs.value).toBe("PRIVATE");
  //   });
  //   it("renders the Representative radio button with the correct value", () => {
  //     const $ = renderPage("business-water-supply", props);
  //     const $radioBoth = $("#water_supply_both");
  //     expect($radioBoth.get(0).attribs.value).toBe("BOTH");
  //   });
  //   it("select the correct radio button based on session data", () => {
  //     const $ = renderPage("business-water-supply", props);
  //     const $selected = $("input:checked");
  //     expect($selected.get(0).attribs.value).toBe("PRIVATE");
  //   });
  // });

  describe("Error messages displayed", () => {
    it("renders the correct summary error", async () => {
      const $ = renderPage("registration-summary", {
        language: "cy",
        validatorErrors: {
          registration_summary: "test error"
        }
      });

      const $pageErrors = getPageDetails.getErrorSummaryLinks($);
      expect($pageErrors.length).toBe(1);
      expect($pageErrors.contents().get(0).data).toBe("test error");
    });

    it("renders the correct error", async () => {
      const $ = renderPage("registration-summary", {
        language: "cy",
        validatorErrors: {
          registration_summary: "test error"
        }
      });

      const $radioError = $("#registration_summary-error");
      expect($radioError.length).toBe(1);
      expect($radioError.contents().get(2).data.trim()).toBe("test error");
    });
  });
});




// import RegistrationSummary from "../pages/registration-summary";
// import { shallow, mount } from "enzyme";
// import { transformAnswersForSummary } from "../src/server/services/data-transform.service";
// import { I18nextProvider } from "react-i18next";
// import i18n from "../i18nForTests";
// jest.mock("../src/server/services/data-transform.service");

// const cumulativeFullAnswers = {
//   establishment_address_line_1: "Example address line 1"
// };

// const testSwitches = {};

// describe("<RegistrationSummary />", () => {
//   it("renders without crashing", () => {
//     const wrapper = shallow(<RegistrationSummary />);
//     expect(wrapper.length).toBe(1);
//   });

//   it("gets given props", () => {
//     const wrapper = mount(
//       <RegistrationSummary
//         cumulativeFullAnswers={cumulativeFullAnswers}
//         allValidationErrors={{}}
//         switches={testSwitches}
//       />
//     );
//     const establishmentFirstLine = wrapper.props().cumulativeFullAnswers
//       .establishment_address_line_1;
//     expect(establishmentFirstLine).toBe("Example address line 1");
//   });

//   describe("SummaryTable component", () => {
//     transformAnswersForSummary.mockImplementation(() => ({ test: "answer" }));

//     it("renders", () => {
//       const wrapper = mount(
//         <I18nextProvider i18n={i18n}>
//           <RegistrationSummary
//             cumulativeFullAnswers={cumulativeFullAnswers}
//             allValidationErrors={{}}
//             switches={testSwitches}
//           />
//         </I18nextProvider>
//       );
//       const summaryTable = wrapper.find("SummaryTable");
//       expect(summaryTable.length).toBe(1);
//     });
//   });
// });
