/**
 * Functions that return correct components for contact details pages dependent on the registration role (Partnership or Operator)
 * @module common/contact-common
 */
import { ContentItem } from "../../src/components";
import { HintText } from "govuk-react";
import PartnershipCommon from "./partnership-common";
import OperatorCommon from "./operator-common";

const hintText = role => {
  const key = "partnership-hint-text";
  if (role === "Partnership") {
    return (
      <ContentItem.B_30_15 key={key}>
        <HintText id={key}>
          Contact details for the main point of contact for this business
        </HintText>
      </ContentItem.B_30_15>
    );
  }
  return;
};

const extraInfo = role => {
  if (role === "Partnership") {
    return PartnershipCommon.whatIsAPartnership();
  }
  return OperatorCommon.whatIsABusinessOperator();
};

const contactCommon = role => {
  return [hintText(role), extraInfo(role)];
};
module.exports = { contactCommon };
