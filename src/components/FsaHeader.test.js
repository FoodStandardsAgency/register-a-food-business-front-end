import FsaHeader from "../components/FsaHeader";
import { mount } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests.js";

describe("<FsaHeader />", () => {
  it("renders without crashing", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <FsaHeader />
      </I18nextProvider>
    );
    expect(wrapper.length).toBe(1);
  });

  it("renders the cookie banner when acceptAllCookies is undefined", () => {
    const wrapper = mount(
      <I18nextProvider i18n={i18n}>
        <FsaHeader />
      </I18nextProvider>
    );
    const cookieBanner = wrapper.find("CookieBanner");
    expect(cookieBanner.length).toBe(1);
  });

  describe("given acceptAllCookies = 'true'", () => {
    it("does not render the cookie banner", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <FsaHeader acceptAllCookies="true" />
        </I18nextProvider>
      );
      const cookieBanner = wrapper.find("CookieBanner");
      expect(cookieBanner.length).toBe(0);
    });
  });

  describe("given acceptAllCookies = 'false'", () => {
    it("does not render the cookie banner", () => {
      const wrapper = mount(
        <I18nextProvider i18n={i18n}>
          <FsaHeader acceptAllCookies="false" />
        </I18nextProvider>
      );
      const cookieBanner = wrapper.find("CookieBanner");
      expect(cookieBanner.length).toBe(0);
    });
  });
});
