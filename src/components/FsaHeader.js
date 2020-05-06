import TopNav, { asTopNavAnchor } from "@govuk-react/top-nav";
import Main from "@govuk-react/main";
import PhaseBanner from "@govuk-react/phase-banner";
import styled from "@emotion/styled";
import CookieBanner from "./CookieBanner";

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

const StyledCompany = styled(AnchorTag)`
border-bottom-color:rgba(0, 0, 0, 0);
border-bottom-style:solid;
border-bottom-width:1px;
color:rgb(255, 255, 255);
cursor:pointer;
display:block;
font-family:nta, Arial, sans-serif;
font-size:30px;
font-weight:700;
height:30px;
line-height:30px;
text-decoration-color:rgb(255, 255, 255);
text-decoration-line:none;
text-decoration-skip-ink:none;
text-decoration-style:solid;
text-size-adjust:100%;
width:368.438px;
`;

const Company = (
  <StyledCompany
    href="https://www.food.gov.uk"
    target="_blank"
    aria-label="food.gov.uk website (opens in new window)"
    style={{
      color: "rgb(255, 255, 255)",
      textDecorationSkipInk: "none",
      fontWeight: 700,
      lineHeight: 1,
      textDecoration: "none",
      borderBottom: "1px solid transparent"
    }}
  >
    Register a Food Business
  </StyledCompany>
);

const StyledHeader = styled("div")({});
const HeaderMain = styled(Main)({
  paddingTop: 0
});

const StyledFeedbackLink = styled(AnchorTag)`
border-bottom-color:rgba(0, 0, 0, 0);
transparent.css-yttx5r-StyledHoc
transparent.css-yttx5r-StyledHoc
border-bottom-style:solid;
solid.css-yttx5r-StyledHoc
solid.css-yttx5r-StyledHoc
border-bottom-width:1px;
color:rgb(0, 94, 165);
cursor:pointer;
display:inline;
font-family:nta, Arial, sans-serif;
font-size:16px;
font-weight:700;
height:auto;
line-height:16px;
text-align:left;
text-decoration-color:rgb(0, 94, 165);
text-decoration-line:none;
text-decoration-skip-ink:none;
text-decoration-style:solid;
text-size-adjust:100%;
text-transform:none;
width:auto;
`;

const FsaHeader = (props) => (
  <StyledHeader role="banner">
    {props.acceptAllCookies === "true" ||
    props.acceptAllCookies === "false" ? null : (
      <section aria-label="cookie banner">
        <CookieBanner />
      </section>
    )}
    <FsaTopNav company={Company} />
    <HeaderMain style={{paddingTop:0}}>
      <PhaseBanner level="beta">
        This is a new service -{" "}
        <StyledFeedbackLink
          id="feedbackLink"
          href={feedbackLink}
          target="_blank"
          aria-label="your feedback (opens in new window)"
        >
          your feedback
        </StyledFeedbackLink>{" "}
        will help us improve it
      </PhaseBanner>
    </HeaderMain>
  </StyledHeader>
);

export default FsaHeader;
