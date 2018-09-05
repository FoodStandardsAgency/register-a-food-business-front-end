import styled from "react-emotion";
import { asAnchor } from "govuk-react";
import Crown from "./crown.svg";

const fontSizeNormal = "16px";
const fontSizeSmall = "14px";

const Footer = styled("div")`
  background-color: #dee0e2;
  bottom: 0px;
  color: #454a4c;
  border-top: 1px solid #a1acb2;
`;

const FooterBody = styled("div")`
  width: calc(100% - 30px);
  max-width: 960px;
  margin: auto;
  padding: 15px 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 641px) {
    width: calc(100% - 60px);
    flex-direction: row;
    justify-content: space-between;
  }
`;

const FooterContent = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const FooterLinkContainer = styled("div")`
  margin-bottom: 15px;
`;

const FooterLink = styled(asAnchor("a"))`
  color: #454a4c;
  margin-right: 15px;
  margin-bottom: 5px;
  display: block;
  font-size: ${fontSizeSmall};
  @media (min-width: 641px) {
    display: inline-block;
    font-size: ${fontSizeNormal};
  }
  &:visited {
    color: #454a4c;
  }
  &:hover {
    color: #171819;
  }
`;

const FooterInlineLink = styled(asAnchor("a"))`
  color: #454a4c;
  &:visited {
    color: #454a4c;
  }
  &:hover {
    color: #171819;
  }
`;

const OGLLogo = styled("div")`
  margin-right: 10px;
  margin-bottom: 15px;
  @media only screen and (min-width: 641px) {
    margin-bottom: 0px;
  }
`;

const FooterText = styled("p")`
  font-size: ${fontSizeSmall};
  margin: 0;
  display: inline-block;
  @media only screen and (min-width: 641px) {
    font-size: ${fontSizeNormal};
  }
`;

const FooterCopyrightContainer = styled("div")`
  margin: 15px;
  margin-bottom: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const FooterCrown = styled(Crown)`
  margin-bottom: 10px;
`;

const FsaFooter = () => (
  <Footer id="fsaFooter">
    <FooterBody>
      <FooterContent>
        <FooterLinkContainer>
          <FooterLink
            id="cookiePolicyFooter"
            href="https://www.food.gov.uk/cookie-policy"
            target="_blank"
          >
            Cookies
          </FooterLink>
          <FooterLink
            id="privacyPolicyFooter"
            href="https://www.food.gov.uk/privacy-policy"
            target="_blank"
          >
            Privacy
          </FooterLink>
        </FooterLinkContainer>
        <div>
          <OGLLogo>
            <svg
              role="presentation"
              focusable="false"
              class="govuk-footer__licence-logo"
              xmlns="http://www.w3.org/2000/svg"
              viewbox="0 0 483.2 195.7"
              height="17"
              width="41"
            >
              <path
                fill="currentColor"
                d="M421.5 142.8V.1l-50.7 32.3v161.1h112.4v-50.7zm-122.3-9.6A47.12 47.12 0 0 1 221 97.8c0-26 21.1-47.1 47.1-47.1 16.7 0 31.4 8.7 39.7 21.8l42.7-27.2A97.63 97.63 0 0 0 268.1 0c-36.5 0-68.3 20.1-85.1 49.7A98 98 0 0 0 97.8 0C43.9 0 0 43.9 0 97.8s43.9 97.8 97.8 97.8c36.5 0 68.3-20.1 85.1-49.7a97.76 97.76 0 0 0 149.6 25.4l19.4 22.2h3v-87.8h-80l24.3 27.5zM97.8 145c-26 0-47.1-21.1-47.1-47.1s21.1-47.1 47.1-47.1 47.2 21 47.2 47S123.8 145 97.8 145"
              />
            </svg>
          </OGLLogo>
          <FooterText>
            All content is available under the{" "}
            <FooterInlineLink
              href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
              target="_blank"
              rel="noopener noreferrer"
              id="open-government-licence"
            >
              Open Government Licence v3.0,
            </FooterInlineLink>{" "}
            except where otherwise stated
          </FooterText>
        </div>
      </FooterContent>
      <FooterCopyrightContainer>
        <FooterCrown />
        <FooterText>© Crown copyright</FooterText>
      </FooterCopyrightContainer>
    </FooterBody>
  </Footer>
);

export default FsaFooter;
