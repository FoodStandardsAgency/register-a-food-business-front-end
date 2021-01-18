import React from "react";
import { ContentItem } from "../../src/components";
import { Heading, HintText } from "govuk-react";
import { PartnershipDescription, OperatorDescription } from "./";
import { withTranslation } from "../../i18n.js";
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";

const AddressHelp = (props) => {
  return props.role === operatorTypeEnum.PARTNERSHIP.key ? (
    <React.Fragment>
      <Heading as="h1" size="LARGE">
        {props.header}
      </Heading>
      <ContentItem.B_30_15>
        <HintText>
          {props.t(
            "Partnership address is the contact address for the partner who is the main point of contact."
          )}
        </HintText>
      </ContentItem.B_30_15>
      <PartnershipDescription />
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Heading as="h1" size="LARGE">
        {props.header}
      </Heading>
      <ContentItem.B_30_15>
        <HintText>
          {props.t(
            "Operator address is the contact address for the operator. For example home address for a sole trader or headquarters address for a limited company."
          )}
        </HintText>
      </ContentItem.B_30_15>
      <OperatorDescription />
    </React.Fragment>
  );
};

export default withTranslation("common")(AddressHelp);
