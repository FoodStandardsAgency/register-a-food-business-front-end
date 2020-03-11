import TopNav, { asTopNavAnchor } from "@govuk-react/top-nav";
import Main from "@govuk-react/main";
import PhaseBanner from "@govuk-react/phase-banner";
import styled from "@emotion/styled";
import CookieBanner from "./CookieBanner";

const Link = asTopNavAnchor("a");
const feedbackLink = "https://goo.gl/forms/WB5adxvWQdDIfVvs2";

const FsaTopNav = styled(TopNav)`
  div:nth-of-type(1) {
    width: 95%;
  }

  div:nth-of-type(2) {
    width: 1%;
  }
`;

const Company = (
  <Link
    href="https://www.food.gov.uk"
    target="_blank"
    aria-label="food.gov.uk website (opens in new window)"
  >
    Register a Food Business
  </Link>
);

const StyledHeader = styled("div")({});
const HeaderMain = styled(Main)({
  paddingTop: 3
});

const FsaHeader = props => (
  <StyledHeader role="banner">
    {props.acceptAllCookies === "true" ||
    props.acceptAllCookies === "false" ? null : (
      <section aria-label="cookie banner">
        <CookieBanner />
      </section>
    )}
    <FsaTopNav company={Company} />
    <HeaderMain>
      <PhaseBanner level="beta">
        This is a new service -{" "}
        <Link
          id="feedbackLink"
          href={feedbackLink}
          target="_blank"
          aria-label="your feedback (opens in new window)"
        >
          your feedback
        </Link>{" "}
        will help us improve it
      </PhaseBanner>
    </HeaderMain>
  </StyledHeader>
);

export default FsaHeader;
