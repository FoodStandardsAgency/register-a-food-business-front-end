import FindAddressButton from "../components/FindAddressButton";
import { shallow } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests";

describe("<FindAddressButton />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(
      <I18nextProvider i18n={i18n}>
        <FindAddressButton />
      </I18nextProvider>
    );
    expect(wrapper.length).toBe(1);
  });
});
