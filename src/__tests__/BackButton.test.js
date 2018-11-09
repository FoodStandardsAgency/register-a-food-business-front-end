import BackButton from "../components/BackButton";
import { shallow, mount } from "enzyme";

describe("<BackButton />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<BackButton />);
    expect(wrapper.length).toBe(1);
  });

  it("gets given the correct currentPage props", () => {
    const currentPage = "/previous-page";

    const wrapper = mount(<BackButton currentPage={currentPage} />);
    const backButton = wrapper.find("BackButton");
    expect(backButton.props().currentPage).toBe(currentPage);
  });

  describe("given that editModeFirstPage IS truthy", () => {
    it("gets given the correct editModeFirstPage props", () => {
      const editModeFirstPage = "/page";

      const wrapper = mount(
        <BackButton editModeFirstPage={editModeFirstPage} />
      );
      const backButton = wrapper.find("BackButton");
      expect(backButton.props().editModeFirstPage).toBe(editModeFirstPage);
    });

    describe("given that editModeFirstPage IS the same as currentPage", () => {
      it("should display no content", () => {
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
    });

    describe("given that editModeFirstPage is NOT the same as currentPage", () => {
      describe("given that props.href IS truthy", () => {
        it("should display the back button with the passed href URL", () => {
          const editModeFirstPage = "/page";
          const currentPage = "/another";

          const wrapper = mount(
            <BackButton
              currentPage={currentPage}
              editModeFirstPage={editModeFirstPage}
              href="example"
            />
          );
          const backElement = wrapper.find(`a#back-link`);
          expect(backElement.props().href).toBe("example");
        });
      });
      describe("given that props.href is NOT truthy", () => {
        it("should display the back button with the full edit route URL", () => {
          const editModeFirstPage = "/page";
          const currentPage = "/another";

          const wrapper = mount(
            <BackButton
              currentPage={currentPage}
              editModeFirstPage={editModeFirstPage}
            />
          );
          const backElement = wrapper.find(`a#back-link`);
          expect(backElement.props().href).toBe("/edit/back/another?edit=page");
        });
      });
    });
  });

  describe("given that editModeFirstPage is NOT truthy", () => {
    describe("given that props.href IS truthy", () => {
      it("should display the back button with the passed href URL", () => {
        const wrapper = mount(<BackButton href="example" />);
        const backElement = wrapper.find(`a#back-link`);
        expect(backElement.props().href).toBe("example");
      });
    });
    describe("given that props.href is NOT truthy", () => {
      it("should display the back button with the full back route URL", () => {
        const wrapper = mount(<BackButton currentPage="/example" />);
        const backElement = wrapper.find(`a#back-link`);
        expect(backElement.props().href).toBe("/back/example");
      });
    });
  });
});
