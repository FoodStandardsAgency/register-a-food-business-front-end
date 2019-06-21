import Error from "../pages/_error";
import { shallow, mount } from "enzyme";

let req = {};
req.session = {};
req.session.council = "council";

let res = {};
res.statusCode = 100;

let err = {};
err.statusCode = 100;

describe("<Error />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <Error statusCode="100" council="council" referrer="referrer" />
    );
    expect(wrapper.length).toBe(1);
  });

  describe("initial props", () => {
    it("sets correctly using res not err error code", () => {
      req.header = jest.fn(headerName => undefined);
      const props = Error.getInitialProps({ req, res, err });
      expect(props.council).toEqual("council");
      expect(props.referrer).toEqual("/");
      expect(props.statusCode).toEqual(100);
    });

    it("sets correctly using res error code", () => {
      req.header = jest.fn(headerName => undefined);
      const props = Error.getInitialProps({ req, res });
      expect(props.council).toEqual("council");
      expect(props.referrer).toEqual("/");
      expect(props.statusCode).toEqual(100);
    });

    it("sets correctly using err error code", () => {
      req.header = jest.fn(headerName => "referrer");
      const props = Error.getInitialProps({ req, err });
      expect(props.council).toEqual("council");
      expect(props.referrer).toEqual("referrer");
      expect(props.statusCode).toEqual(100);
    });

    it("sets to null if no code provided", () => {
      req.header = jest.fn(headerName => "referrer");
      const props = Error.getInitialProps({ req });
      expect(props.council).toEqual("council");
      expect(props.referrer).toEqual("referrer");
      expect(props.statusCode).toEqual(null);
    });
  });

  describe("showing 404 error", () => {
    it("renders without crashing", () => {
      const wrapper = shallow(
        <Error statusCode="404" council="council" referrer="referrer" />
      );
      expect(wrapper.length).toBe(1);
    });

    it("has a back to start button with correct link when council set", () => {
      const wrapper = mount(
        <Error statusCode="404" council="council" referrer="referrer" />
      );
      const backLink = wrapper.find("BackLink");
      expect(backLink.props().href).toBe("/new/council");
    });

    it("has a back to start button with correct link when council not set", () => {
      const wrapper = mount(
        <Error statusCode="404" council={undefined} referrer="referrer" />
      );
      const backLink = wrapper.find("BackLink");
      expect(backLink.props().href).toBe("/");
    });

    it("has a back button with correct link", () => {
      const wrapper = mount(
        <Error statusCode="404" council="council" referrer="referrer" />
      );
      const form = wrapper.find("form#unknown-error-form");
      expect(form.props().action).toBe("referrer");
    });
  });

  describe("showing 500 error", () => {
    it("renders without crashing", () => {
      const wrapper = shallow(
        <Error statusCode="500" council="council" referrer="referrer" />
      );
      expect(wrapper.length).toBe(1);
    });

    it("has a back to start button with correct link when council set", () => {
      const wrapper = mount(
        <Error statusCode="500" council="council" referrer="referrer" />
      );
      const backLink = wrapper.find("BackLink");
      expect(backLink.props().href).toBe("/new/council");
    });

    it("has a back to start button with correct link when council not set", () => {
      const wrapper = mount(
        <Error statusCode="500" council={undefined} referrer="referrer" />
      );
      const backLink = wrapper.find("BackLink");
      expect(backLink.props().href).toBe("/");
    });

    it("has a to food.gov.uk button with correct link", () => {
      const wrapper = mount(
        <Error statusCode="500" council="council" referrer="referrer" />
      );
      const form = wrapper.find("form#server-error-form");
      expect(form.props().action).toBe(
        "https://www.food.gov.uk/business-guidance/register-a-food-business"
      );
    });
  });

  describe("showing generic error", () => {
    it("renders without crashing", () => {
      const wrapper = shallow(
        <Error statusCode="501" council="council" referrer="referrer" />
      );
      expect(wrapper.length).toBe(1);
    });

    it("has a back to start button with correct link when council set", () => {
      const wrapper = mount(
        <Error statusCode="501" council="council" referrer="referrer" />
      );
      const backLink = wrapper.find("BackLink");
      expect(backLink.props().href).toBe("/new/council");
    });

    it("has a back to start button with correct link when council not set", () => {
      const wrapper = mount(
        <Error statusCode="501" council={undefined} referrer="referrer" />
      );
      const backLink = wrapper.find("BackLink");
      expect(backLink.props().href).toBe("/");
    });

    it("has a report issue button with correct link", () => {
      const wrapper = mount(
        <Error statusCode="501" council="council" referrer="referrer" />
      );
      const form = wrapper.find("form#other-error-form");
      expect(form.props().action).toBe("about:blank");
    });
  });
});
