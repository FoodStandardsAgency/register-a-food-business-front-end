import React from "react";
import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton,
  ProcessedErrorSummary,
  SubmissionErrorSummary,
  OnHandleErrorClick,
  PostForm
} from "../src/components";
import { Heading, Checkbox, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";
import { withTranslation } from "../i18n";

const NewTabLinkRenderer = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

class Declaration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitClicked: false
    };
    this.clickSubmitButton = this.clickSubmitButton.bind(this);
  }

  clickSubmitButton(e) {
    e.preventDefault();
    this.setState({
      submitClicked: true
    });
    this.refs.submitRegistration.submit();
  }

  render() {
    return (
      <FsaLayout {...this.props}>
        <PostForm
          action={this.props.formAction}
          ref="submitRegistration"
          csrfToken={this.props.csrfToken}
        >
          <BackButton {...this.props} t={this.props.t} />
          <ProcessedErrorSummary
            t={this.props.t}
            validatorErrors={this.props.validatorErrors}
            onHandleErrorClick={OnHandleErrorClick}
          />
          <SubmissionErrorSummary
            t={this.props.t}
            submissionErrors={this.props.submissionError}
          />
          <Heading as="h1" size="LARGE">
            {this.props.t("Declaration")}
          </Heading>

          <Paragraph>
            {this.props.t(
              "Review these statements and tick all three boxes to agree."
            )}
          </Paragraph>

          <ContentItem.B_45_30>
            <MultiChoice
              label=""
              meta={{
                touched: true,
                error:
                  `${props.t(this.props.validatorErrors["declaration1"])}` ||
                  `${props.t(this.props.validatorErrors["declaration2"])}` ||
                  `${props.t(this.props.validatorErrors["declaration3"])}`
              }}
            >
              <Checkbox
                name="declaration1"
                value="I declare that the information I have given on this form is correct and complete to the best of my knowledge and belief."
                error={`${props.t(this.props.validatorErrors["declaration1"])}`}
                defaultChecked={this.props.cumulativeFullAnswers.declaration1}
              >
                {this.props.t(
                  "I declare that the information I have given on this form is correct and complete to the best of my knowledge and belief."
                )}
              </Checkbox>

              <Checkbox
                name="declaration2"
                value="I, or the operator, will notify my local authority of any significant
        changes to the business activity, including closure, within 28 days of
        the change happening."
                error={`${props.t(this.props.validatorErrors["declaration2"])}`}
                defaultChecked={this.props.cumulativeFullAnswers.declaration2}
              >
                {this.props.t(
                  "The operator will notify their local council of any significant changes to the business activity, including closure, within 28 days of the change happening."
                )}
              </Checkbox>

              <Checkbox
                name="declaration3"
                value="I, or the operator, understands the operator is legally responsible for
        the safety and authenticity of the food being produced or served at this
        establishment."
                error={`${props.t(this.props.validatorErrors["declaration3"])}`}
                defaultChecked={this.props.cumulativeFullAnswers.declaration3}
              >
                {this.props.t(
                  "The operator understands they are legally responsible for the safety and authenticity of the food being produced or served at this establishment."
                )}
              </Checkbox>
            </MultiChoice>
          </ContentItem.B_45_30>

          <Heading as="h1" size="LARGE">
            {this.props.t("Feedback")}
          </Heading>

          <Paragraph>
            {this.props.t(
              "Congratulations, you've almost finished. We want to provide you with the best experience possible and value your feedback."
            )}
          </Paragraph>

          <ContentItem.B_45_30>
            <Checkbox
              name="feedback1"
              value="I agree to be contacted to provide feedback to help develop this service"
              defaultChecked={this.props.cumulativeFullAnswers.feedback1}
            >
              {this.props.t(
                "I agree to be contacted to provide feedback to help develop this service (optional)"
              )}
            </Checkbox>
            <Paragraph linkRenderer={NewTabLinkRenderer}>
              {this.props.t(
                "[Details on how we use your data](/pdfs/feedback)"
              )}
            </Paragraph>
          </ContentItem.B_45_30>

          {this.state.submitClicked === true ? (
            <ContinueButton disabled type="submit" t={this.props.t} />
          ) : (
            <ContinueButton
              onClick={this.clickSubmitButton}
              type="submit"
              t={this.props.t}
            />
          )}
        </PostForm>
      </FsaLayout>
    );
  }
}

export default withTranslation("common")(SessionWrapper(Declaration));

Declaration.propTypes = {
  cumulativeFullAnswers: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
  ),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
