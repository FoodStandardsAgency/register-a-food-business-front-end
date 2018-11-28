import EstablishmentAddress from "../pages/establishment-address-manual";
import { mount, shallow } from "enzyme";

const testValidatorErrors = {
  example: "test error"
};

const testCumulativeAnswers = {
  example: "test answer"
};

const testSwitches = {};

describe("<EstablishmentAddress />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<EstablishmentAddress />);
    expect(wrapper.length).toBe(1);
  });

  describe("establishment first line input field", () => {
    it("renders", () => {
      const wrapper = mount(
        <EstablishmentAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentFirstLine = wrapper.find(
        "InputField#establishment_first_line"
      );
      expect(establishmentFirstLine.length).toBe(1);
    });

    it("gets given the correct error prop", () => {
      const validatorErrors = {
        establishment_first_line: "test error"
      };
      const wrapper = mount(
        <EstablishmentAddress
          validatorErrors={validatorErrors}
          cumulativeFullAnswers={testCumulativeAnswers}
          switches={testSwitches}
        />
      );
      const establishmentFirstLine = wrapper.find(
        "InputField#establishment_first_line"
      );
      expect(establishmentFirstLine.props().meta.error).toBe("test error");
    });

    it("gets given the correct default value", () => {
      const cumulativeFullAnswers = {
        establishment_first_line: "default"
      };
      const wrapper = mount(
        <EstablishmentAddress
          validatorErrors={testValidatorErrors}
          cumulativeFullAnswers={cumulativeFullAnswers}
          switches={testSwitches}
        />
      );
      const establishmentFirstLine = wrapper.find(
        "InputField#establishment_first_line"
      );
      expect(establishmentFirstLine.props().input.defaultValue).toBe("default");
    });
  });

  describe("back button", () => {
    describe("given a truthy switch of '/establishment-address-none-found'", () => {
      it("passes council info to href and has href of '/establishment-address'", () => {
        const wrapper = mount(
          <EstablishmentAddress
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            council="cardiff"
            switches={{ "/establishment-address-none-found": true }}
          />
        );
        const establishmentBackButton = wrapper.find("a#back-link");
        expect(establishmentBackButton.props().href).toBe(
          "/new/cardiff/establishment-address"
        );
      });
    });

    describe("given a falsy switch of '/establishment-address-none-found'", () => {
      it("passes council info to href and has href of '/establishment-address-select'", () => {
        const wrapper = mount(
          <EstablishmentAddress
            validatorErrors={testValidatorErrors}
            cumulativeFullAnswers={testCumulativeAnswers}
            council="cardiff"
            switches={{ "/establishment-address-none-found": false }}
          />
        );
        const establishmentBackButton = wrapper.find("a#back-link");
        expect(establishmentBackButton.props().href).toBe(
          "/new/cardiff/establishment-address-select"
        );
      });
    });
  });
});
