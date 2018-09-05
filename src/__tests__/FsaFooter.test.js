import FsaFooter from "../components/FsaFooter";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<FsaFooter />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<FsaFooter />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<FsaFooter />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
