import React from "react";
import { ContentItem } from "../../src/components";
import { HintText } from "govuk-react";
import { PartnershipDescription, OperatorDescription } from "./";
import { withTranslation } from "../../i18n.js";

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
  return props.role === "Partnership" ? (
    <React.Fragment>
      <PartnershipHintText />
      <PartnershipDescription />
    </React.Fragment>
  ) : (
    <OperatorDescription />
  );
};

export default withTranslation(ContactDetailsHelp);
