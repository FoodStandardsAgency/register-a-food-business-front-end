import ErrorWrapperPage from "../pages/errorWrapper";
import { shallow } from "enzyme";

let res = {};
res.statusCode = 100;

let err = {};
err.statusCode = 100;

describe("<ErrorWrapperPage />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ErrorWrapperPage statusCode="100" />);
    expect(wrapper.length).toBe(1);
  });

  describe("initial props", () => {
    it("sets correctly using res not err error code", () => {
      const props = ErrorWrapperPage.getInitialProps({ res, err });
      expect(props.statusCode).toEqual(100);
    });

    it("sets correctly using res error code", () => {
      const props = ErrorWrapperPage.getInitialProps({ res });
      expect(props.statusCode).toEqual(100);
    });

    it("sets correctly using err error code", () => {
      const props = ErrorWrapperPage.getInitialProps({ err });
      expect(props.statusCode).toEqual(100);
    });

    it("sets to null if no code provided", () => {
      const props = ErrorWrapperPage.getInitialProps({
        undefined,
        undefined
      });
      expect(props.statusCode).toEqual(null);
    });
  });
});
