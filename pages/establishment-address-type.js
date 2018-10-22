import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import { Header, Radio, MultiChoice, HiddenText, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentAddressType = props => (
  <FsaLayout {...props}>
    <BackButton
      editModeFirstPage={props.editModeFirstPage}
      originator="establishment-address-type"
    />
    <Header level={2}>Where is this establishment located?</Header>

    <HiddenText summaryText={"What is an establishment?"}>
      <Paragraph mb={0}>
        An establishment is the location of your food business. If it is a
        mobile food business, please use the location where it is normally
        stored overnight.
      </Paragraph>
    </HiddenText>

    <form
      action={props.formAction}
      method="post"
    >
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.establishment_type
          }}
        >
          <Radio
            name="establishment_type"
            value="Place of business or commercial premises"
            id="establishment_type_business_commercial"
            defaultChecked={
              props.cumulativeAnswers.establishment_type ===
              "Place of business or commercial premises"
            }
          >
            In a place of business or commercial premises
          </Radio>
          <Radio
            name="establishment_type"
            value="Mobile or moveable premises"
            id="establishment_type_mobile_moveable"
            defaultChecked={
              props.cumulativeAnswers.establishment_type ===
              "Mobile or moveable premises"
            }
          >
            In a mobile or moveable premises
          </Radio>
          <Radio
            name="establishment_type"
            value="Home or domestic premises"
            id="establishment_type_home_domestic"
            defaultChecked={
              props.cumulativeAnswers.establishment_type ===
              "Home or domestic premises"
            }
          >
            In a home or domestic premises
          </Radio>
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton editModeFirstPage={props.editModeFirstPage} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(EstablishmentAddressType);

EstablishmentAddressType.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
