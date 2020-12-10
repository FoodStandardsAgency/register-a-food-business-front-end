import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  SelectWithHeader,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { Heading, Paragraph, Link } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import LanguageChangeButton from "../src/components/LanguageChangeButton";

const EstablishmentAddressLookup = (props) => (
  <FsaLayout {...props}>
    <LanguageChangeButton />
    <BackButton {...props} t={props.t} />
    <Heading as="h1" size="LARGE">
      {props.t("What is the establishment's address?")}
    </Heading>

    <HiddenTextAccessible
      t={props.t}
      id="hiddenTextEstablishment"
      summary={"What is an establishment?"}
    >
      <Paragraph mb={0}>
        {props.t(
          "An establishment is the location of your food business. If it is a mobile food business, please use the location where it is normally stored overnight."
        )}
      </Paragraph>
    </HiddenTextAccessible>

    <PostForm action={props.formAction} csrfToken={props.csrfToken}>
      <ContentItem.B_30_15>
        <ContentItem.B_30_15>
          <Heading as="h2" size="MEDIUM">
            {props.t("Postcode")}
          </Heading>
          <Paragraph className="establishmentPostcodeDisplay" mb={0}>
            {props.cumulativeFullAnswers.establishment_postcode_find}
          </Paragraph>
          <Link
            id="changeEstablishmentPostcode"
            href={
              props.editModeFirstPage
                ? "/establishment-address?edit=establishment-address"
                : "/establishment-address"
            }
          >
            {props.t("Change postcode")}
          </Link>
        </ContentItem.B_30_15>

        <ContentItem.B_20_20>
          <SelectWithHeader
            label={`${props.t("Select an address for")} ${
              props.cumulativeFullAnswers.establishment_postcode_find
            }`}
            input={{
              id: "establishmentAddressDropdown",
              name: "establishment_address_selected",
              defaultValue:
                props.cumulativeFullAnswers.establishment_address_selected || 0
            }}
          >
            {props.addressLookups.establishment_postcode_find ? (
              props.addressLookups.establishment_postcode_find.map(
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
                ? `/new/${props.council}/establishment-address-manual?edit=establishment-address-manual`
                : `/new/${props.council}/establishment-address-manual`
            }
          >
            {props.t("I can't find my address in the list")}
          </Link>
        </ContentItem.B_30_15>
      </ContentItem.B_30_15>

      <ContinueButton {...props} t={props.t} />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(
  SessionWrapper(EstablishmentAddressLookup)
);

EstablishmentAddressLookup.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  )
};
