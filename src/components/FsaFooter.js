import styled from "@emotion/styled";
import { Link, ListItem, UnorderedList } from "@slice-and-dice/govuk-react";
import { withTranslation, i18n } from "../../i18n.js";
import React, { useState, useEffect } from "react";

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

const FsaFooter = (props) => {
  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => {
    setJsEnabled(true);
  }, []);

  return (
    <Footer id="fsaFooter" role="contentinfo">
      <FooterBody>
        <FooterContent>
          <FooterLinkContainer>
            <FooterUnorderedList>
              <FooterListItem>
                <FooterLink
                  id="cookiePolicyFooter"
                  href={props.t("cookies-link")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={props.t("cookie policy (opens in a new window)")}
                  style={{ color: "#454a4c" }}
                >
                  {props.t("Cookies")}
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink
                  id="privacyPolicyFooter"
                  href={props.t("privacy-link")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={props.t("privacy policy (opens in a new window)")}
                  style={{ color: "#454a4c" }}
                >
                  {props.t("Privacy")}
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink
                  id="feedbackFooter"
                  href={props.t("feedback-form")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={props.t(
                    "give us feedback on the service (opens in a new window)"
                  )}
                  style={{ color: "#454a4c" }}
                >
                  {props.t("Feedback")}
                </FooterLink>
              </FooterListItem>
              <FooterListItem>
                <FooterLink
                  id="accessibilityFooter"
                  href={props.t("accessibility-link")}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={props.t(
                    "accessibility statement (opens in a new window)"
                  )}
                  style={{ color: "#454a4c" }}
                >
                  {props.t("Accessibility")}
                </FooterLink>
              </FooterListItem>
              {jsEnabled ? (
                <FooterListItem>
                  <FooterLink
                    id="languageFooter"
                    href="#language"
                    onClick={() =>
                      i18n.changeLanguage(i18n.language === "cy" ? "en" : "cy")
                    }
                    rel="noopener noreferrer"
                    aria-label={props.t("Change Language")}
                    style={{
                      color: "#454a4c",
                      textDecorationLine: "underline",
                      cursor: "pointer"
                    }}
                  >
                    {props.t("Change Language")}
                  </FooterLink>
                </FooterListItem>
              ) : (
                <FooterListItem>
                  <FooterLink
                    id="languageFooter"
                    href={props.t("change-language")}
                    rel="noopener noreferrer"
                    aria-label={props.t("Change Language")}
                    style={{
                      color: "#454a4c",
                      textDecorationLine: "underline",
                      cursor: "pointer"
                    }}
                  >
                    {props.t("Change Language")}
                  </FooterLink>
                </FooterListItem>
              )}
            </FooterUnorderedList>
          </FooterLinkContainer>
        </FooterContent>
      </FooterBody>
    </Footer>
  );
};

export default withTranslation("common")(FsaFooter);
