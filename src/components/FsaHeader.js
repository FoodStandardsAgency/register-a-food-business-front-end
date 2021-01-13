import TopNav from "@govuk-react/top-nav";
import asTopNavAnchor from "../hoc/asTopNavAnchor";
import Main from "@govuk-react/main";
import PhaseBanner from "@govuk-react/phase-banner";
import styled from "@emotion/styled";
import CookieBanner from "./CookieBanner";
import FsaLogoEnglish from "./FsaLogoEnglish";
import FsaLogoWelsh from "./FsaLogoWelsh";
import { withTranslation, i18n } from "../../i18n.js";

const AnchorTag = asTopNavAnchor("a");
const feedbackLink = "https://goo.gl/forms/WB5adxvWQdDIfVvs2";

const FsaTopNav = styled(TopNav)`
  div:nth-of-type(1) {
    width: 95%;
  }

  div:nth-of-type(2) {
    width: 1%;
  }
`;

const Company = (props) => (
  <>
    {i18n.language === "en" ? <FsaLogoEnglish /> : <FsaLogoWelsh />}

    <AnchorTag
      style={{
        color: "rgb(255, 255, 255)",
        textDecorationSkipInk: "none",
        fontWeight: 700,
        lineHeight: 1,
        textDecoration: "none",
        borderBottom: "1px solid transparent"
      }}
    >
      &nbsp;&nbsp;&nbsp;
      {props.t("Register a Food Business")}
    </AnchorTag>
  </>
);

const StyledHeader = styled("div")({});
const HeaderMain = styled(Main)({
  paddingTop: 3
});

const FsaHeader = (props) => (
  <StyledHeader role="banner">
    {props.acceptAllCookies === "true" ||
    props.acceptAllCookies === "false" ? null : (
      <section aria-label={props.t("cookie banner")}>
        <CookieBanner />
      </section>
    )}
    <FsaTopNav company={Company(props)} />
    <HeaderMain>
      <PhaseBanner level="beta">
        {props.t("This is a new service")} -{" "}
        <AnchorTag
          id="feedbackLink"
          href={feedbackLink}
          target="_blank"
          aria-label={props.t("your feedback (opens in new window)")}
          style={{
            color: "rgb(0, 94, 165)"
          }}
        >
          {props.t("your feedback")}
        </AnchorTag>{" "}
        {props.t("will help us improve it")}
      </PhaseBanner>
    </HeaderMain>
  </StyledHeader>
);

export default withTranslation("common")(FsaHeader);
