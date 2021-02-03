import styled from "@emotion/styled";
import { withTranslation } from "../../i18n.js";
import { Link } from "govuk-react";
import { BackButton } from "./index";

const LanguageLink = styled(Link)`
  color: #0b0c0c !important;
  margin: 15px;
  font-size: 14px;
  line-height: 1.25;
  @media (min-width: 641px) {
    display: inline-block;
    font-size: 16px;
  }
  &:visited {
    color: #0b0c0c !important;
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
  <StyledContainer>
    <BackLinkContainer>
      <BackButton {...props} />
    </BackLinkContainer>
    <LanguageLinkContainer>
      <LanguageLink
        id="languageEnHeader"
        href="?lang=en"
        rel="noopener noreferrer"
        aria-label={"Change the language to English"}
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
        id="languageCyHeader"
        href="?lang=cy"
        rel="noopener noreferrer"
        aria-label="Newid yr iaith i'r Gymraeg"
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
