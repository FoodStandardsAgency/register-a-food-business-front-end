import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  SelectWithHeader,
  HiddenTextAccessible,
  PostForm
} from "../src/components";
import { Heading, Paragraph, Link } from "@slice-and-dice/govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";
import styled from "@emotion/styled";

const StyledDd = styled.dd`
  margin-inline-start: 0px;
`;

const EstablishmentAddressLookup = (props) => (
  <FsaLayout {...props}>
    <Heading as="h1" size="LARGE">
      {props.t("Which is the establishment's address from the list?")}
    </Heading>

    <HiddenTextAccessible
      id="hiddenTextEstablishment"
      summary={props.t("What is an establishment?")}
      {...props}
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
            {props.t("Postcode you have entered")}
          </Heading>
          <dl>
            <dt>
              <Paragraph className="establishmentPostcodeDisplay" mb={0}>
                {props.cumulativeFullAnswers.establishment_postcode_find}
              </Paragraph>
            </dt>
            <StyledDd>
              <Link
                id="changeEstablishmentPostcode"
                href={
                  props.editModeFirstPage
                    ? `/new/${props.council}/establishment-address?edit=establishment-address`
                    : `/new/${props.council}/establishment-address`
                }
              >
                {props.t("Change postcode")}
              </Link>
            </StyledDd>
          </dl>
        </ContentItem.B_30_15>

        <ContentItem.B_20_20>
          <Heading as="h2" size="MEDIUM" className="govuk-label govuk-label—l">
            {`${props.t("Select an address for")} ${
              props.cumulativeFullAnswers.establishment_postcode_find
            }`}
          </Heading>
          <SelectWithHeader
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

      <ContinueButton {...props} />
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
