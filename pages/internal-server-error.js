import React from "react";
import { FsaLayout } from "../src/components";
import { Heading, Paragraph, BackLink, Button } from "govuk-react";
import { withTranslation } from "../i18n";
import LanguageChangeButton from "../src/components/LanguageChangeButton";

class InternalServerError extends React.Component {
  static getInitialProps({ req, res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    const council = req.session.council;
    return { statusCode, council };
  }

  render() {
    const backToStartLink = this.props.council
      ? `/new/${this.props.council}`
      : "/";
    return (
      <FsaLayout {...this.props}>
        <LanguageChangeButton />
        <BackLink href={backToStartLink}>
          {this.props.t("Back to start")}
        </BackLink>
        <Heading as="h1">
          {this.props.t("This service is currently unavailable")}
        </Heading>
        <Paragraph>
          {this.props.t(
            "Sorry about that, we seem to be experiencing some difficulties."
          )}
        </Paragraph>
        <Paragraph>{this.props.t("Please try again later.")}</Paragraph>
        <form
          id="server-error-form"
          action="https://www.food.gov.uk/business-guidance/register-a-food-business"
        >
          <Button type="submit">{this.props.t("Return to food.gov.uk")}</Button>
        </form>
      </FsaLayout>
    );
  }
}

export default withTranslation("common")(InternalServerError);
