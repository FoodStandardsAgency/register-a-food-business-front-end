import React from "react";
import { FsaLayout } from "../src/components";
import { Header, Paragraph, BackLink, Button } from "govuk-react";

class Error extends React.Component {
  static getInitialProps({ req, res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    const council = req.session.council;
    const referrer = req.header("Referer") || "/";
    return { statusCode, council, referrer };
  }

  render() {
    switch (this.props.statusCode) {
      case 404:
        return (
          <FsaLayout {...this.props}>
            <BackLink href={`/new/${this.props.council}`}>
              Back to start
            </BackLink>
            <Header level={1}>Page Not Found</Header>
            <Paragraph>
              Please contact your Local Council if you need to speak to someone
              about your food business registration urgently.
            </Paragraph>
            <form action={this.props.referrer}>
              <Button type="submit">Return to previous page</Button>
            </form>
          </FsaLayout>
        );
      case 500:
        return (
          <FsaLayout {...this.props}>
            <BackLink href={`/new/${this.props.council}`}>
              Back to start
            </BackLink>
            <Header level={1}>This service is currently unavailable</Header>
            <Paragraph>
              Sorry about that, we seem to be experiencing some difficulties.
            </Paragraph>
            <Paragraph>Please try again later.</Paragraph>
            <form action="https://www.food.gov.uk/business-guidance/register-a-food-business">
              <Button type="submit">Return to food.gov.uk</Button>
            </form>
          </FsaLayout>
        );
      default:
        return (
          <FsaLayout {...this.props}>
            <BackLink href={`/new/${this.props.council}`}>
              Back to start
            </BackLink>
            <Header level={1}>Oops</Header>
            <Paragraph>
              We seem to be experiencing some difficulties. Try refreshing this
              this page to fix the problem.
            </Paragraph>
            <Paragraph>
              If you have seen this message several times, please report it
              below.
            </Paragraph>
            {/* TODO - Add in appropriate link */}
            <form action="about:blank">
              <Button type="submit">Report a problem</Button>
            </form>
          </FsaLayout>
        );
    }
  }
}

export default Error;
