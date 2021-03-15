import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  FindAddressButton,
  ProcessedErrorSummary,
  OnHandleErrorClick,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { Heading, InputField, Paragraph } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const EstablishmentAddress = (props) => (
  <FsaLayout {...props}>
    <ProcessedErrorSummary
      validatorErrors={props.validatorErrors}
      onHandleErrorClick={OnHandleErrorClick}
    />
    <Heading as="h1" size="LARGE">
      <label
        class="govuk-label govuk-label--l"
        for="establishment_postcode_find"
      >
        {props.t("Establishment address")}
      </label>
    </Heading>

    <HiddenTextAccessible
      summary={props.t("What is an establishment?")}
      {...props}
    >
      <Paragraph mb={0}>
        {props.t(
          "An establishment is the location of your food business, and the food activities taking place there. If it is a mobile food business, please use the location where it is normally stored overnight."
        )}
      </Paragraph>
    </HiddenTextAccessible>

    <PostForm
      action="/findaddress/establishment-address"
      csrfToken={props.csrfToken}
    >
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <InputField
            input={{
              id: "establishment_postcode_find",
              name: "establishment_postcode_find",
              defaultValue:
                props.cumulativeFullAnswers.establishment_postcode_find,
              autoComplete: "postal-code"
            }}
            errorPrefix={`${props.t("Error")}: `}
            id="establishment_postcode_find"
            meta={{
              touched: true,
              error: props.t(props.validatorErrors.establishment_postcode_find)
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

export default withTranslation("common")(SessionWrapper(EstablishmentAddress));

EstablishmentAddress.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
