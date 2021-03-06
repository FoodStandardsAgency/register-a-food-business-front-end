import InternalServerError from "../pages/internal-server-error";
import { shallow, mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18nForTests";

const req = {};
req.session = {};
req.session.council = "council";
req.url = "test/test";

const res = { statusCode: 100 };
const err = { statusCode: 101 };

describe("<Error />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <InternalServerError statusCode="100" council="council" />
    );
    expect(wrapper.length).toBe(1);
  });

  describe("initial props", () => {
    it("returns response status code if present", () => {
      const props = InternalServerError.getInitialProps({ req, res, err });

      expect(props.council).toEqual("council");
      expect(props.statusCode).toEqual(100);
    });

    it("returns error status code if present", () => {
      const props = InternalServerError.getInitialProps({ req, err });
      expect(props.council).toEqual("council");
      expect(props.statusCode).toEqual(101);
    });

    it("returns null error code if response and error not present", () => {
      const props = InternalServerError.getInitialProps({ req });
      expect(props.council).toEqual("council");
      expect(props.statusCode).toBe(null);
    });
  });
  it("renders without crashing", () => {
    const wrapper = shallow(
      <InternalServerError statusCode="500" council="council" />
    );
    expect(wrapper.length).toBe(1);
  });

  it("has a back to start button with correct link when council set", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <InternalServerError
          statusCode="500"
          council="council"
          referrer="referrer"
        />
      </I18nextProvider>
    );
    const backLink = wrapper.find("BackLink");
    expect(backLink.props().href).toBe("/new/council");
  });

  it("has a back to start button with correct link when council not set", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <InternalServerError statusCode="500" />
      </I18nextProvider>
    );
    const backLink = wrapper.find("BackLink");
    expect(backLink.props().href).toBe("/");
  });

  it("has a to food.gov.uk button with correct link", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <InternalServerError
          statusCode="500"
          council="council"
          referrer="referrer"
        />
      </I18nextProvider>
    );
    const form = wrapper.find("form#server-error-form");
    expect(form.props().action).toBe(
      "https://www.food.gov.uk/business-guidance/register-a-food-business"
    );
  });
});
