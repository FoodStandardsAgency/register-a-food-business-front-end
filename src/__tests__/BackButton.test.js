import BackButton from "../components/BackButton";
import { shallow, mount } from "enzyme";
import renderer from "react-test-renderer";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("<BackButton />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BackButton />);
    expect(wrapper.length).toBe(1);
  });

  it("matches the previous snapshot", () => {
    const tree = renderer.create(<BackButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("gets given the correct originator props", () => {
    const originator = "previous-page";

    const wrapper = mount(<BackButton originator={originator} />);
    const backButton = wrapper.find("BackButton");
    expect(backButton.props().originator).toBe(originator);
  });

  it("gets given the correct editModeFirstPage props", () => {
    const editModeFirstPage = "/page";

    const wrapper = mount(<BackButton editModeFirstPage={editModeFirstPage} />);
    const backButton = wrapper.find("BackButton");
    expect(backButton.props().editModeFirstPage).toBe(editModeFirstPage);
  });

  it("It displays no content when given that editModeFirstPage is the same as currentPage", () => {
    const editModeFirstPage = "/page";
    const currentPage = "/page";

    const wrapper = mount(
      <BackButton
        currentPage={currentPage}
        editModeFirstPage={editModeFirstPage}
      />
    );
    const backElement = wrapper.find(`a#back-link`);
    expect(backElement.length).toBe(0);
  });

  it("It displays when given that editModeFirstPage is NOT the same as currentPage", () => {
    const editModeFirstPage = "/page";
    const currentPage = "/another";

    const wrapper = mount(
      <BackButton
        currentPage={currentPage}
        editModeFirstPage={editModeFirstPage}
      />
    );
    const backElement = wrapper.find(`a#back-link`);
    expect(backElement.length).toBe(1);
  });

  it("passes the given custom href if provided", () => {
    const wrapper = mount(<BackButton href="example" />);
    const backElement = wrapper.find(`a#back-link`);
    expect(backElement.props().href).toBe("example");
  });
});
