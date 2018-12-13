import ContinueButton from "../components/ContinueButton";
import { shallow, mount } from "enzyme";

describe("<ContinueButton />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<ContinueButton />);
    expect(wrapper.length).toBe(1);
  });

  it("is passed the 'type' prop", () => {
    const wrapper = mount(<ContinueButton type="test" />);
    const continueButton = wrapper.find("ContinueButton");
    expect(continueButton.props().type).toBe("test");
  });

  it("is passed the 'editModeFirstPage' props", () => {
    const editModeFirstPage = "/page";

    const wrapper = mount(
      <ContinueButton editModeFirstPage={editModeFirstPage} />
    );
    const continueButton = wrapper.find("ContinueButton");
    expect(continueButton.props().editModeFirstPage).toBe(editModeFirstPage);
  });

  it("passes the prop 'start' as 'false' by default for the Button component", () => {
    const wrapper = mount(<ContinueButton />);
    const GovUkButton = wrapper.find("Button");
    expect(GovUkButton.props().start).toBe(false);
  });

  describe("when not given a type prop", () => {
    const wrapper = mount(<ContinueButton />);

    it("has 'Continue' as the button text", () => {
      expect(wrapper.text()).toContain("Continue");
    });
  });

  describe("given a type of 'begin'", () => {
    const wrapper = mount(<ContinueButton type="begin" />);

    it("has 'Begin registration' as the button text", () => {
      expect(wrapper.text()).toContain("Begin registration");
    });

    it("passes the prop 'start' as 'true' for the Button component", () => {
      const GovUkButton = wrapper.find("Button");
      expect(GovUkButton.props().start).toBe(true);
    });

    it("contains a <ButtonArrow> component", () => {
      const buttonArrow = wrapper.find("ButtonArrow");
      expect(buttonArrow.length).toBe(1);
    });
  });

  describe("given that edit mode is true", () => {
    const editModeFirstPage = "/page";
    const wrapper = mount(
      <ContinueButton editModeFirstPage={editModeFirstPage} />
    );

    it("has 'Save' as the button text", () => {
      expect(wrapper.text()).toContain("Save");
    });
  });

  describe("given a type of 'submit'", () => {
    const wrapper = mount(<ContinueButton type="submit" />);

    it("has 'Submit' as the button text", () => {
      expect(wrapper.text()).toContain("Submit");
    });
  });
});
