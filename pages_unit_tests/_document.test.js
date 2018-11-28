import Document from "../pages/_document";
import { shallow } from "enzyme";

// This test is very minimal to just ensure that the custom _document file renders correctly.
// Could be expanded in future to test full functionality.

describe("<Document />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <Document cookies={{ acceptAllCookies: "true" }} />
    );
    expect(wrapper.length).toBe(1);
  });
});
