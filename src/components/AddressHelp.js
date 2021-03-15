import React from "react";
import { ContentItem } from "../../src/components";
import { Heading, HintText } from "@slice-and-dice/govuk-react";
import { withTranslation } from "../../i18n.js";
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";

const AddressHelp = (props) => {
  return props.role === operatorTypeEnum.PARTNERSHIP.key ? (
    <React.Fragment>
      <Heading as="h1" size="LARGE">
        {props.id ? (
          <label class="govuk-label govuk-label--l" for={props.id}>
            {props.t("What is the partnership contact's address?")}
          </label>
        ) : (
          props.t("What is the partnership contact's address?")
        )}
      </Heading>
      <ContentItem.B_30_15>
        <HintText>
          {props.t(
            "Partnership address is the contact address for the partner who is the main point of contact."
          )}
        </HintText>
      </ContentItem.B_30_15>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Heading as="h1" size="LARGE">
        {props.id ? (
          <label class="govuk-label govuk-label--l" for={props.id}>
            {props.t("What is the operator's address?")}
          </label>
        ) : (
          props.t("What is the operator's address?")
        )}
      </Heading>

      <ContentItem.B_30_15>
        <HintText>
          {props.t(
            "Operator address is the contact address for the operator. For example home address for a sole trader or headquarters address for a limited company."
          )}
        </HintText>
      </ContentItem.B_30_15>
    </React.Fragment>
  );
};

export default withTranslation("common")(AddressHelp);
