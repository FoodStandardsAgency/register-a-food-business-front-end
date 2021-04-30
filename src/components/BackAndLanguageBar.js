import styled from "@emotion/styled";
import { withTranslation, i18n } from "../../i18n.js";
import { Link } from "@slice-and-dice/govuk-react";
import { BackButton } from "./index";
import React, { useState, useEffect } from "react";

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

const BackAndLanguageBar = (props) => {
  const [jsEnabled, setJsEnabled] = useState(false);

  useEffect(() => {
    setJsEnabled(true);
  }, []);

  return (
    <StyledContainer>
      <BackLinkContainer>
        <BackButton {...props} />
      </BackLinkContainer>
      {jsEnabled ? (
        <LanguageLinkContainer>
          <LanguageLink
            id="languageEnHeader"
            href="#english"
            onClick={() => i18n.changeLanguage("en")}
            rel="noopener noreferrer"
            aria-label={"Change the language to English"}
            style={{
              textDecorationLine: props.t("enLangLink-underline"),
              fontWeight: props.t("enLangLink-fontWeight"),
              cursor: props.t("enLangLink-cursor")
            }}
          >
            English
          </LanguageLink>
          |
          <LanguageLink
            id="languageCyHeader"
            href="#cymraeg"
            onClick={() => i18n.changeLanguage("cy")}
            rel="noopener noreferrer"
            aria-label="Newid yr iaith i'r Gymraeg"
            style={{
              textDecorationLine: props.t("cyLangLink-underline"),
              fontWeight: props.t("cyLangLink-fontWeight"),
              cursor: props.t("cyLangLink-cursor")
            }}
          >
            Cymraeg
          </LanguageLink>
        </LanguageLinkContainer>
      ) : (
        <LanguageLinkContainer>
          <LanguageLink
            id="languageEnHeader"
            href="?lang=en"
            rel="noopener noreferrer"
            aria-label={"Change the language to English"}
            style={{
              textDecorationLine: props.t("enLangLink-underline"),
              fontWeight: props.t("enLangLink-fontWeight"),
              cursor: props.t("enLangLink-cursor")
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
              textDecorationLine: props.t("cyLangLink-underline"),
              fontWeight: props.t("cyLangLink-fontWeight"),
              cursor: props.t("cyLangLink-cursor")
            }}
          >
            Cymraeg
          </LanguageLink>
        </LanguageLinkContainer>
      )}
    </StyledContainer>
  );
};

export default withTranslation("common")(BackAndLanguageBar);
