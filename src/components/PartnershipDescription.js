import { HiddenTextAccessible } from "./";
import { Paragraph } from "govuk-react";
import { withTranslation } from "../../i18n.js";

const PartnershipDescription = (props) => (
  <HiddenTextAccessible summary={props.t("What is a partnership?")} {...props}>
    <Paragraph mb={0}>
      {props.t(
        "In a partnership, you and your partner (or partners) personally share responsibility for your food business"
      )}
    </Paragraph>
  </HiddenTextAccessible>
);

export default withTranslation("common")(PartnershipDescription);
