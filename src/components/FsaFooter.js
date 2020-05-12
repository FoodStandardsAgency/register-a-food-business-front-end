import styled from "@emotion/styled";
import { Link, ListItem, UnorderedList } from "govuk-react";

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
  padding: 30px 0px;
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

const FooterLink = styled(Link)`
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

const FooterListItem = styled(ListItem)`
  display: inline;
`;

const FooterUnorderedList = styled(UnorderedList)`
  padding-left: 0px;
`;

const FsaFooter = () => (
  <Footer id="fsaFooter" role="contentinfo">
    <FooterBody>
      <FooterContent>
        <FooterLinkContainer>
          <FooterUnorderedList>
            <FooterListItem>
              <FooterLink
                id="cookiePolicyFooter"
                href="https://www.food.gov.uk/cookie-policy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="cookie policy (opens in a new window)"
                style={{color:"#454a4c"}}
              >
                Cookies
              </FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink
                id="privacyPolicyFooter"
                href="https://www.food.gov.uk/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="privacy policy (opens in a new window)"
                style={{color:"#454a4c"}}
              >
                Privacy
              </FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink
                id="feedbackFooter"
                href="https://docs.google.com/forms/d/e/1FAIpQLSd78otan9gVxW-tIO6DDdqPdmKvm29Ssi9nWLkOOx1g8ddQjw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="give us feedback on the service (opens in a new window)"
                style={{color:"#454a4c"}}
              >
                Feedback
              </FooterLink>
            </FooterListItem>
          </FooterUnorderedList>
        </FooterLinkContainer>
      </FooterContent>
    </FooterBody>
  </Footer>
);

export default FsaFooter;
