import FsaHeader from "../components/FsaHeader";
import { shallow } from "enzyme";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18nForTests.js";

describe("<FsaHeader />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<FsaHeader />);
    expect(wrapper.length).toBe(1);
  });

  it("renders the cookie banner when acceptAllCookies is undefined", () => {
    const wrapper = shallow(<FsaHeader />);
    const cookieBanner = wrapper.find("CookieBanner");
    expect(cookieBanner.length).toBe(1);
  });

  describe("given acceptAllCookies = 'true'", () => {
    it("does not render the cookie banner", () => {
      const wrapper = shallow(<FsaHeader acceptAllCookies="true" />);
      const cookieBanner = wrapper.find("CookieBanner");
      expect(cookieBanner.length).toBe(0);
    });
  });

  describe("given acceptAllCookies = 'false'", () => {
    it("does not render the cookie banner", () => {
      const wrapper = shallow(<FsaHeader acceptAllCookies="false" />);
      const cookieBanner = wrapper.find("CookieBanner");
      expect(cookieBanner.length).toBe(0);
    });
  });
});
