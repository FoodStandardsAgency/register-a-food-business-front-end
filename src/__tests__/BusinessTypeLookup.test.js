import BusinessTypeLookup from "../components/BusinessTypeLookup";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";
// import dynamic from "next/dynamic";
// import Autocomplete from "accessible-autocomplete/react";

// jest.mock("next/dynamic");

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<BusinessTypeLookup />", () => {
  // beforeEach(() => {
  //   dynamic.mockImplementation(() => Autocomplete);
  // });
  it("renders without crashing", () => {
    const wrapper = shallow(<BusinessTypeLookup />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<BusinessTypeLookup />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Function:suggest", () => {});
