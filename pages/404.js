import React from "react";
import { FsaLayout } from "../src/components";
import { Heading, Paragraph, BackLink, Button } from "govuk-react";

class Error extends React.Component {

    render() {
        const backToStartLink = "/";
        return (
            <FsaLayout {...this.props}>
                <BackLink href={backToStartLink}>Back to start</BackLink>
                <Heading as="h1">Page Not Found</Heading>
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
