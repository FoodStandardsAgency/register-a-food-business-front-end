import { FsaLayout, SessionWrapper, ContentItem } from "../src/components";
import { Heading, Paragraph } from "@slice-and-dice/govuk-react";
import { withTranslation } from "../i18n";

const Maintenance = (props) => (
  <FsaLayout {...props} hideBack="true">
    <Heading as="h1">{props.t("Register a food business")}</Heading>

    <ContentItem.B_30_15 {...props}>
      <Paragraph>
        {props.t(
          "This service is currently undergoing maintenance.  Please try again later."
        )}
      </Paragraph>
    </ContentItem.B_30_15>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(Maintenance));
