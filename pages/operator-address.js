import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  FindAddressButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  AddressHelp,
  PostForm
} from "../src/components";
import { InputField } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const OperatorAddress = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <AddressHelp role={props.cumulativeFullAnswers.registration_role} />
    <PostForm
      action="/findaddress/operator-address"
      csrfToken={props.csrfToken}
    >
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
              error: props.t(props.validatorErrors.operator_postcode_find)
            }}
          >
            {props.t("Postcode")}
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <FindAddressButton />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(OperatorAddress));

OperatorAddress.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
