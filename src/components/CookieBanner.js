import styled from "react-emotion";
import { Paragraph, Button } from "govuk-react";

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
  ${props =>
    props.blackLink
      ? `
    margin: 0 20px;
    a {
      color: #0b0c0c;
      &:hover {
        color: #4a4a4a;
      }
      &:visited {
        color: #2f2f2f;
      }
    }
    `
      : null};
  @media only screen and (min-width: 641px) {
    font-size: ${fontSize};
  }
`;

const BannerRow = styled("div")`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const BannerActionContainer = styled("div")`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
`;

const AcceptButton = styled(Button)`
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
    margin-bottom: 10px;
  }
`;

const CookieBanner = () => (
  <Banner>
    <BannerBody>
      <BannerParagraph mb={2}>
        This website uses cookies. We use cookies to create the registration and
        analyse how the service is performing. We do not share any information
        with advertisers or social media platforms. We do not store any
        information about you in the cookie.
      </BannerParagraph>
      <BannerRow>
        <BannerParagraph mb={2}>
          [Find our more about what cookies
          are](https://www.gov.uk/help/cookies) and [read our cookie
          policy](https://www.food.gov.uk/cookie-policy).
        </BannerParagraph>
        <BannerActionContainer>
          <BannerParagraph mb={2} blackLink>
            [I don't accept cookies](../disable-cookies)
          </BannerParagraph>
          <AcceptButton>I accept cookies</AcceptButton>
        </BannerActionContainer>
      </BannerRow>
    </BannerBody>
  </Banner>
);

export default CookieBanner;
