import React from "react";
import { FsaLayout } from "../src/components";
import { Header, Paragraph, BackLink, Button } from "govuk-react";

class Error extends React.Component {
  static getInitialProps({ req, res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    const council = req.session.council;
    const referrer = req.header("Referrer");
    return { statusCode, council, referrer };
  }

  render() {
    const backToStartLink = this.props.council
      ? `/new/${this.props.council}`
      : "/";
    return (
      <FsaLayout {...this.props}>
        <BackLink href={backToStartLink}>Back to start</BackLink>
        <Header level={1}>Page Not Found</Header>
        <Paragraph>
          Please contact your Local Council if you need to speak to someone
          about your food business registration urgently.
        </Paragraph>
        {this.props.referrer ? (
          <form id="unknown-error-form" action={this.props.referrer}>
            <Button type="submit">Return to previous page</Button>
          </form>
        ) : null}
      </FsaLayout>
    );
  }
}

export default Error;
