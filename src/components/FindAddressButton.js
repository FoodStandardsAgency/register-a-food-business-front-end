import { Button } from "govuk-react";
import { withTranslation } from "../../i18n.js";

const FindAddressButton = (props) => (
  <Button id="find-address" type="submit">
    {props.t("Find address")}
  </Button>
);

export default withTranslation("FindAddressButton")(FindAddressButton);
