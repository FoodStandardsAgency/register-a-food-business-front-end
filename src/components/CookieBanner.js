import styled from "react-emotion";
import { Paragraph, Button, asAnchor } from "govuk-react";

const fontSize = "16px";

const Banner = styled("div")`
  background-color: #d9e8f2;
`;

const BannerBody = styled("div")`
  width: calc(100% - 30px);
  max-width: 960px;
  margin: auto;
  padding: 15px 0;

  @media (min-width: 641px) {
    width: calc(100% - 60px);
  }
`;

const BannerParagraph = styled(Paragraph)`
  font-size: ${fontSize};
  @media only screen and (min-width: 641px) {
    font-size: ${fontSize};
  }
`;

const BannerRow = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  @media only screen and (min-width: 641px) {
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-end;
  }
`;

const BannerActionContainer = styled("div")`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
  justify-content: space-between;
  width: 100%;
  @media only screen and (min-width: 641px) {
    flex-wrap: nowrap;
    justify-content: flex-end;
    margin-top: 0px;
    align-items: flex-end;
  }
`;

const BannerLinkContainer = styled("div")`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  margin-right: 20px;
`;

const CookieButton = styled(Button)`
  margin-bottom: 0px;
  background-color: white;
  box-shadow: 0 2px 0 #4e80b4;
  color: #0b0c0c;
  &:hover {
    background-color: #f2f2f2;
    color: #0b0c0c;
  }
  &:focus {
    background-color: #f2f2f2;
    color: #0b0c0c;
  }
  font-size: ${fontSize};
  @media only screen and (min-width: 641px) {
    font-size: ${fontSize};
    margin-bottom: 0px;
  }
`;

const RejectCookiesButton = styled("button")`
  margin-right: 20px;
  font-size: ${fontSize};
  color: #0b0c0c;
  background-color: transparent;
  border: none;
  padding: 0;
  text-decoration: underline;
  cursor: pointer;
  text-align: left;
  &:hover {
    color: #4a4a4a;
  }
  &:visited {
    color: #2f2f2f;
  }
`;

const AnchorTag = styled(asAnchor("a"))`
  padding: 5px;
  font-size: ${fontSize};
  @media only screen and (min-width: 641px) {
    font-size: ${fontSize};
  }
`;

const CookieBanner = () => (
  <Banner id="cookieBanner">
    <BannerBody>
      <BannerParagraph mb={2}>
        Register a food business uses a cookie to create the registration. We
        also use optional cookies to analyse how the service is performing. We
        do not share any information with advertisers or social media platforms.
        We do not store any information about you in the cookie.
      </BannerParagraph>
      <BannerRow>
        <BannerLinkContainer>
          <AnchorTag id="cookieInfo" href="https://www.gov.uk/help/cookies">
            Find out more about cookies
          </AnchorTag>
          <AnchorTag
            id="cookiePolicy"
            href="https://www.food.gov.uk/cookie-policy"
          >
            Read our cookie policy
          </AnchorTag>
        </BannerLinkContainer>

        <BannerActionContainer>
          <form action="/setcookie/acceptAllCookies/false" method="post">
            <RejectCookiesButton id="cookieReject" type="submit">
              I do not accept optional cookies
            </RejectCookiesButton>
          </form>
          <form action="/setcookie/acceptAllCookies/true" method="post">
            <CookieButton id="cookieAccept" type="submit">
              I accept cookies
            </CookieButton>
          </form>
        </BannerActionContainer>
      </BannerRow>
    </BannerBody>
  </Banner>
);

export default CookieBanner;
