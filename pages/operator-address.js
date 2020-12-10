import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  FindAddressButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  AddressHelp,
  PostForm
} from "../src/components";
import { InputField } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import LanguageChangeButton from "../src/components/LanguageChangeButton";

const OperatorAddress = (props) => (
  <FsaLayout {...props}>
    <LanguageChangeButton />
    <BackButton {...props} t={props.t} />
    <ProcessedErrorSummary
      t={props.t}
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <AddressHelp
      role={props.cumulativeFullAnswers.registration_role}
      t={props.t}
    />
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
              error: `${props.t(props.validatorErrors.operator_postcode_find)}`
            }}
          >
            {props.t("Postcode")}
          </InputField>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <FindAddressButton t={props.t} />
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
