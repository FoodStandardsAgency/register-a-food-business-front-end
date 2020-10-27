import React from "react";
import { ContentItem } from "../../src/components";
import { HintText } from "govuk-react";
import { PartnershipDescription, OperatorDescription } from "./";
import { RegistrationRoleEnum } from "../enums";

const PartnershipHintText = () => (
  <ContentItem.B_30_15>
    <HintText>
      Contact details for the main point of contact for this business
    </HintText>
  </ContentItem.B_30_15>
);

const ContactDetailsHelp = (props) => {
  return props.role === RegistrationRoleEnum.PARTNERSHIP.key ? (
    <React.Fragment>
      <PartnershipHintText />
      <PartnershipDescription />
    </React.Fragment>
  ) : (
    <OperatorDescription />
  );
};

export default ContactDetailsHelp;
