import CrownIcon from "@govuk-react/icon-crown";
import { Paragraph } from "govuk-react";
import TopNav, { asNavLinkAnchor, asTopNavAnchor } from "@govuk-react/top-nav";
import Main from "@govuk-react/main";
import PhaseBanner from "@govuk-react/phase-banner";
import styled from "react-emotion";
import CookieBanner from "./CookieBanner";
import { BREAKPOINTS } from "@govuk-react/constants";

const MediaQueryLarge = `@media only screen and (min-width: ${
  BREAKPOINTS.LARGESCREEN
})`;

const AnchorTag = asTopNavAnchor("a");
const feedbackLink = "https://goo.gl/forms/WB5adxvWQdDIfVvs2";

// center the service title text vertically when in desktop size windows
const FsaTopNav = styled(TopNav)`
  ${MediaQueryLarge} {
    div:nth-child(2) {
      justify-content: center;
    }
  }
`;

const Company = (
  <AnchorTag
    href="https://www.gov.uk"
    target="_blank"
    aria-label="gov.uk website (opens in new window)"
  >
    <TopNav.IconTitle icon={<CrownIcon width="36" height="32" />}>
      GOV.UK
    </TopNav.IconTitle>
  </AnchorTag>
);

const NavAnchor = asNavLinkAnchor("a");
const ServiceTitle = props => (
  <NavAnchor
    href={`/new/${props.council}`}
    aria-label="start a new food business registration"
  >
    <Paragraph mb={0}>Register a food business</Paragraph>
  </NavAnchor>
);
const StyledHeader = styled("div")({});

const HeaderMain = styled(Main)({
  paddingTop: 0
});

const FsaHeader = props => (
  <StyledHeader role="banner">
    {props.acceptAllCookies === "true" ||
    props.acceptAllCookies === "false" ? null : (
      <section aria-label="cookie banner">
        <CookieBanner />
      </section>
    )}
    <FsaTopNav company={Company} serviceTitle={ServiceTitle(props)} />
    <HeaderMain>
      <PhaseBanner level="beta">
        This is a new service -{" "}
        <AnchorTag
          id="feedbackLink"
          href={feedbackLink}
          target="_blank"
          aria-label="your feedback (opens in new window)"
        >
          your feedback
        </AnchorTag>{" "}
        will help us improve it
      </PhaseBanner>
    </HeaderMain>
  </StyledHeader>
);

export default FsaHeader;
