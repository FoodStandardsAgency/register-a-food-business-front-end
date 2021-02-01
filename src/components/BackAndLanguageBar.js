import styled from "@emotion/styled";
import { withTranslation, i18n } from "../../i18n.js";
import { Link } from "govuk-react";
import { BackButton } from "./index";

const LanguageLink = styled(Link)`
  color: #0b0c0c;
  margin: 15px;
  font-size: 14px;
  line-height: 1.25;
  @media (min-width: 641px) {
    display: inline-block;
    font-size: 16px;
  }
  &:visited {
    color: #0b0c0c;
  }
  &:hover {
    color: #171819;
  }
`;

const StyledContainer = styled("div")`
  display: flex;
  margin: auto;
  max-width: 960px;
  align-items: center;
`;

const BackLinkContainer = styled("div")`
  text-align: left;
  width: 25%;
  margin: 15px;
`;

const LanguageLinkContainer = styled("div")`
  text-align: right;
  width: 75%;
  cursor: default;
  padding-bottom: 15px;
  @media (min-width: 641px) {
    padding-bottom: 30px;
  }
`;

const BackAndLanguageBar = (props) => (
  <StyledContainer role="banner">
    <BackLinkContainer>
      <BackButton {...props} />
    </BackLinkContainer>
    <LanguageLinkContainer>
      <LanguageLink
        id="languageEnFooter"
        onClick={() => i18n.changeLanguage("en")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={props.t("Change the language to English")}
        style={{
          textDecorationLine: props.t("styles:enLangLink-underline"),
          fontWeight: props.t("styles:enLangLink-fontWeight"),
          cursor: props.t("styles:enLangLink-cursor")
        }}
      >
        English
      </LanguageLink>
      |
      <LanguageLink
        id="languageCyFooter"
        onClick={() => i18n.changeLanguage("cy")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={props.t("Change the language to Welsh")}
        style={{
          textDecorationLine: props.t("styles:cyLangLink-underline"),
          fontWeight: props.t("styles:cyLangLink-fontWeight"),
          cursor: props.t("styles:cyLangLink-cursor")
        }}
      >
        Cymraeg
      </LanguageLink>
    </LanguageLinkContainer>
  </StyledContainer>
);

export default withTranslation(["common", "styles"])(BackAndLanguageBar);
