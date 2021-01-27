import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SelectWithHeader,
  AddressHelp,
  PostForm
} from "../src/components";
import { Heading, Paragraph, Link } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import { operatorTypeEnum } from "@slice-and-dice/register-a-food-business-validation";

const OperatorAddressLookup = (props) => (
  <FsaLayout {...props}>
    <BackButton {...props} />
    <AddressHelp
      role={props.cumulativeFullAnswers.registration_role}
      header={props.t(
        props.cumulativeFullAnswers.registration_role ===
          operatorTypeEnum.PARTNERSHIP.key
          ? "Which is the partnership contact's address from the list?"
          : "Which is the operator's address from the list?"
      )}
    />
    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <Heading as="h2" size="MEDIUM">
            {props.t("Postcode you have entered")}
          </Heading>
          <Paragraph className="operatorPostcodeDisplay" mb={0}>
            {props.cumulativeFullAnswers.operator_postcode_find}
          </Paragraph>
          <Link
            id="changeOperatorPostcode"
            href={
              props.editModeFirstPage
                ? "/operator-address?edit=operator-address"
                : "/operator-address"
            }
          >
            {props.t("Change postcode")}
          </Link>
        </ContentItem.B_30_15>
        <ContentItem.B_20_20>
          <SelectWithHeader
            label={`${props.t("Select an address for")} ${
              props.cumulativeFullAnswers.operator_postcode_find
            }`}
            input={{
              id: "operatorAddressDropdown",
              name: "operator_address_selected",
              defaultValue:
                props.cumulativeFullAnswers.operator_address_selected || 0
            }}
          >
            {props.addressLookups.operator_postcode_find ? (
              props.addressLookups.operator_postcode_find.map(
                (address, index) => (
                  <option key={address.summaryline} value={index}>
                    {address.summaryline}
                  </option>
                )
              )
            ) : (
              <option>{props.t("No addresses found")}</option>
            )}
          </SelectWithHeader>
        </ContentItem.B_20_20>

        <ContentItem.B_30_15>
          <Link
            id="cantFindAddressLink"
            href={
              props.editModeFirstPage
                ? `/new/${props.council}/operator-address-manual?edit=operator-address-manual`
                : `/new/${props.council}/operator-address-manual`
            }
          >
            {props.t("I can't find my address in the list")}
          </Link>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(OperatorAddressLookup));

OperatorAddressLookup.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  )
};
