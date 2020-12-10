import { Button } from "govuk-react";
import { i18n } from "../../i18n.js";

const LanguageChangeButton = () => (
  <Button
    type="button"
    onClick={() => i18n.changeLanguage(i18n.language === "en" ? "cy" : "en")}
  >
    {i18n.language === "en" ? "Cymraeg" : "English"}
  </Button>
);

export default LanguageChangeButton;
