import React from "react";
import { FsaLayout } from "../src/components";
import { Heading, Paragraph } from "govuk-react";
import { withTranslation } from "../i18n";

function Custom404(props) {
  return (
    <FsaLayout {...props} backToStart="true">
      <Heading as="h1">{props.t("Page Not Found")}</Heading>
      <Paragraph>
        {props.t(
          "Please contact your Local Council if you need to speak to someone about your food business registration urgently."
        )}
      </Paragraph>
    </FsaLayout>
  );
}
export default withTranslation("common")(Custom404);
