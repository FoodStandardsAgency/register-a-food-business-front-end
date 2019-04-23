import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  FindAddressButton,
  ProcessedErrorSummary,
  OnHandleErrorClick
} from "../src/components";
import { InputField } from "govuk-react";
import PropTypes from "prop-types";
import RoleAddress from "./common/operator-address-common";

const OperatorAddress = props => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    {RoleAddress.header(props.cumulativeFullAnswers.registration_role)}
    <ContentItem.B_30_15>
      {RoleAddress.hintText(props.cumulativeFullAnswers.registration_role)}
    </ContentItem.B_30_15>
    {RoleAddress.extraInfo(props.cumulativeFullAnswers.registration_role)}
    <form action="/findaddress/operator-address" method="post">
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              id: "operator_postcode_find",
              name: "operator_postcode_find",
              defaultValue: props.cumulativeFullAnswers.operator_postcode_find,
              autoComplete: "postal-code"
            }}
            id="operatorPostcodeFindComponent"
            meta={{
              touched: true,
              error: props.validatorErrors.operator_postcode_find
            }}
          >
            Postcode
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <FindAddressButton />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorAddress);

OperatorAddress.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
