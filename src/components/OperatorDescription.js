import { HiddenTextAccessible } from "../../src/components";
import { Paragraph } from "govuk-react";
import { withTranslation } from "../../i18n.js";

const OperatorDescription = (props) => (
  <HiddenTextAccessible
    summary={props.t("What is a food business operator?")}
    {...props}
  >
    <Paragraph mb={0}>
      {props.t(
        "The operator is the person or people, charity or company who makes the decisions about the food business. They decide what it serves and how it operates."
      )}
    </Paragraph>
  </HiddenTextAccessible>
);

export default withTranslation("common")(OperatorDescription);
