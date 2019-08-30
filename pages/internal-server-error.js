import React from "react";
import { FsaLayout } from "../src/components";
import { Header, Paragraph, BackLink, Button } from "govuk-react";

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
        <BackLink href={backToStartLink}>Back to start</BackLink>
        <Header level={1}>This service is currently unavailable</Header>
        <Paragraph>
          Sorry about that, we seem to be experiencing some difficulties.
        </Paragraph>
        <Paragraph>Please try again later.</Paragraph>
        <form
          id="server-error-form"
          action="https://www.food.gov.uk/business-guidance/register-a-food-business"
        >
          <Button type="submit">Return to food.gov.uk</Button>
        </form>
      </FsaLayout>
    );
  }
}

export default InternalServerError;
