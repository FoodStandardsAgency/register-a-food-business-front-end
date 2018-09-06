import React from "react";
import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  BackButton,
  ContinueButton
} from "../src/components";
import {
  Header,
  Checkbox,
  MultiChoice,
  Paragraph,
  HintText
} from "govuk-react";
import PropTypes from "prop-types";

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
    document.getElementById("submitRegistration").submit();
  }

  render() {
    return (
      <FsaLayout {...this.props}>
        <form
          action={`/continue/declaration/${this.props.editMode}`}
          method="post"
          id="submitRegistration"
        >
          <BackButton editMode={this.props.editMode} originator="declaration" />
          <Header level={2}>Declaration</Header>

          <Paragraph>
            Review these statements and tick all three boxes to agree.
          </Paragraph>

          <ContentItem.B_45_30>
            <MultiChoice
              label=""
              meta={{
                touched: true,
                error:
                  this.props.validatorErrors["declaration1"] ||
                  this.props.validatorErrors["declaration2"] ||
                  this.props.validatorErrors["declaration3"]
              }}
            >
              <Checkbox
                name="declaration1"
                value="I declare that the information I have given on this form is correct and
        complete to the best of my knowledge and belief."
                error={this.props.validatorErrors["declaration1"]}
                defaultChecked={this.props.cumulativeAnswers.declaration1}
              >
                I declare that the information I have given on this form is
                correct and complete to the best of my knowledge and belief.
              </Checkbox>

              <Checkbox
                name="declaration2"
                value="I, or the operator, will notify food authorities of any significant
        changes to the business activity, including closure, within 28 days of
        the change happening."
                error={this.props.validatorErrors["declaration2"]}
                defaultChecked={this.props.cumulativeAnswers.declaration2}
              >
                The operator will notify their local council of any significant
                changes to the business activity, including closure, within 28
                days of the change happening.
              </Checkbox>

              <Checkbox
                name="declaration3"
                value="I, or the operator, understands the operator is legally responsible for
        the safety and authenticity of the food being produced or served at this
        establishment."
                error={this.props.validatorErrors["declaration3"]}
                defaultChecked={this.props.cumulativeAnswers.declaration3}
              >
                The operator understands they are legally responsible for the
                safety and authenticity of the food being produced or served at
                this establishment.
              </Checkbox>
            </MultiChoice>
          </ContentItem.B_45_30>

          <ContentItem.B_20_20>
            <HintText>It may take a moment to submit.</HintText>
          </ContentItem.B_20_20>

          {this.state.submitClicked === true ? (
            <ContinueButton disabled type="submit" />
          ) : (
            <ContinueButton onClick={this.clickSubmitButton} type="submit" />
          )}
        </form>
      </FsaLayout>
    );
  }
}

export default SessionWrapper(Declaration);

Declaration.propTypes = {
  cumulativeAnswers: PropTypes.objectOf(PropTypes.string),
  validatorErrors: PropTypes.objectOf(PropTypes.string)
};
