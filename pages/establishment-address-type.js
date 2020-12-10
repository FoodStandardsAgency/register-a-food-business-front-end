import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { establishmentTypeEnum } from "@slice-and-dice/register-a-food-business-validation";
import { Fieldset, Radio, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import LanguageChangeButton from "../src/components/LanguageChangeButton";

const EstablishmentAddressType = (props) => (
  <FsaLayout {...props}>
    <LanguageChangeButton />
    <BackButton {...props} t={props.t} />
    <ProcessedErrorSummary
      t={props.t}
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_45_30>
        <Fieldset>
          <Fieldset.Legend
            size="LARGE"
            isPageHeading
            style={{ marginBottom: "30px" }}
          >
            {props.t("Where is this establishment located?")}
          </Fieldset.Legend>
          <HiddenTextAccessible
            t={props.t}
            summary={props.t("What is an establishment?")}
          >
            <Paragraph mb={0}>
              {props.t(
                "An establishment is the location of your food business. If it is a mobile food business, please use the location where it is normally stored overnight."
              )}
            </Paragraph>
          </HiddenTextAccessible>
          <MultiChoice
            label=""
            meta={{
              touched: true,
              error: `${props.t(props.validatorErrors.establishment_type)}`
            }}
          >
            <Radio
              name="establishment_type"
              value={establishmentTypeEnum.MOBILE.key}
              id="establishment_type_mobile_moveable"
              defaultChecked={
                props.cumulativeFullAnswers.establishment_type ===
                establishmentTypeEnum.MOBILE.key
              }
            >
              {props.t("In a mobile or moveable premises")}
            </Radio>
            <Radio
              name="establishment_type"
              value={establishmentTypeEnum.DOMESTIC.key}
              id="establishment_type_home_domestic"
              defaultChecked={
                props.cumulativeFullAnswers.establishment_type ===
                establishmentTypeEnum.DOMESTIC.key
              }
            >
              {props.t("In a home or domestic premises")}
            </Radio>
            <Radio
              name="establishment_type"
              value={establishmentTypeEnum.COMMERCIAL.key}
              id="establishment_type_business_commercial"
              defaultChecked={
                props.cumulativeFullAnswers.establishment_type ===
                establishmentTypeEnum.COMMERCIAL.key
              }
            >
              {props.t("In a commercial or public premises")}
            </Radio>
          </MultiChoice>
        </Fieldset>
      </ContentItem.B_45_30>

      <ContinueButton {...props} t={props.t} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(
  SessionWrapper(EstablishmentAddressType)
);

EstablishmentAddressType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
