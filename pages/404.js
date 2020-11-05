/* istanbul ignore file */
import React from "react";
import { FsaLayout } from "../src/components";
import { Heading, Paragraph, BackLink } from "govuk-react";

export default function Custom404() {
  return (
    <FsaLayout>
      <BackLink href={"/"}>Back to start</BackLink>
      <Heading as="h1">Page Not Found</Heading>
      <Paragraph>
        Please contact your Local Council if you need to speak to someone about
        your food business registration urgently.
      </Paragraph>
    </FsaLayout>
  );
}
