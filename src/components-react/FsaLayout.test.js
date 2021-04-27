import FsaLayout from "../components/FsaLayout";
import { shallow } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";

describe("<FsaLayout />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <I18nextProvider i18n={i18n}>
        <FsaLayout />
      </I18nextProvider>
    );
    expect(wrapper.length).toBe(1);
  });

  it("renders child elements", () => {
    const wrapper = shallow(
      <I18nextProvider i18n={i18n}>
        <FsaLayout>
          <div>A child element</div>
        </FsaLayout>
      </I18nextProvider>
    );
    expect(wrapper.contains(<div>A child element</div>)).toBe(true);
  });
});
