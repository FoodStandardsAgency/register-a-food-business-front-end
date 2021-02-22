import React from "react";
import { ContentItem } from "../../src/components";
import { HintText } from "govuk-react";
import { OperatorDescription } from "./";
import { withTranslation } from "../../i18n.js";
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";

const PartnershipHintText = (props) => (
  <ContentItem.B_30_15>
    <HintText>
      {props.t(
        "Contact details for the main point of contact for this business"
      )}
    </HintText>
  </ContentItem.B_30_15>
);

const ContactDetailsHelp = (props) => {
  return props.role === operatorTypeEnum.PARTNERSHIP.key ? (
    <React.Fragment>
      <PartnershipHintText t={props.t} />
    </React.Fragment>
  ) : (
    <OperatorDescription {...props} />
  );
};

export default withTranslation("common")(ContactDetailsHelp);
