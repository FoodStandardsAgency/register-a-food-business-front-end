import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  HintTextSmall
} from "../src/components";
import { Header, Radio, MultiChoice, HiddenText, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const OperatorType = props => (
  <FsaLayout {...props}>
    <BackButton editModeFirstPage={props.editModeFirstPage} originator="operator-type" />
    <Header level={2}>Who operates this business?</Header>

    <HiddenText summaryText={"What is a food business operator?"}>
      <Paragraph mb={0}>
        The food business operator is the person, charity or company who makes
        the decisions about the food business, what it serves and how it
        operates.
      </Paragraph>
    </HiddenText>

    <form action={props.formAction} method="post">
      <ContentItem.B_45_30>
        <MultiChoice
          label=""
          meta={{
            touched: true,
            error: props.validatorErrors.operator_type
          }}
        >
          <Radio
            name="operator_type"
            value="A person"
            id="operator_type_person"
            defaultChecked={
              props.cumulativeFullAnswers.operator_type === "A person"
            }
          >
            A person
            <HintTextSmall>
              The food business is owned or operated by an individual person,
              rather than any legal entity such as a business or charity.
            </HintTextSmall>
          </Radio>
          <Radio
            name="operator_type"
            value="A company"
            id="operator_type_company"
            defaultChecked={
              props.cumulativeFullAnswers.operator_type === "A company"
            }
          >
            A company
            <HintTextSmall>
              The food business is owned or operated by a limited company rather
              than a single person or partnership of people.
            </HintTextSmall>
          </Radio>
          <Radio
            name="operator_type"
            value="A charity"
            id="operator_type_charity"
            defaultChecked={
              props.cumulativeFullAnswers.operator_type === "A charity"
            }
          >
            A charity
            <HintTextSmall>
              The food business is owned or operated by a charity rather than a
              company, person or partnership of people.
            </HintTextSmall>
          </Radio>
        </MultiChoice>
      </ContentItem.B_45_30>

      <ContinueButton editModeFirstPage={props.editModeFirstPage} />
    </form>
  </FsaLayout>
);

export default SessionWrapper(OperatorType);

OperatorType.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
