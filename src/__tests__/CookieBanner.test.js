import CookieBanner from "../components/CookieBanner";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<CookieBanner />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<CookieBanner />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<CookieBanner />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
