import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  PostForm
} from "../src/components";
import { Heading, Paragraph, Link } from "govuk-react";
import InsetText from "../src/components/InsetText";
import { withTranslation, i18n } from "../i18n";

const Index = (props) => (
  <FsaLayout {...props}>
    <Heading as="h1">{props.t("Register a food business")}</Heading>

    <ContentItem.B_30_15 {...props}>
      <Paragraph>
        {props.t(
          "When you start a new food business or take over an existing business, you must register with your local authority. You should do this at least **28 days** before trading or before food operations start."
        )}
      </Paragraph>
    </ContentItem.B_30_15>

    <InsetText className="bold">
      {props.t(
        "During this registration, you may come across a few specialist terms, which we have described below"
      )}
      :
    </InsetText>

    <ContentItem.B_30_15>
      <Heading as="h2" size="MEDIUM" mb={1}>
        {props.t("Food business operator")}
      </Heading>
      <Paragraph mb={0}>
        {props.t(
          "The operator is the person, charity or company who makes the decisions about the food business. They decide what it serves and how it operates."
        )}
      </Paragraph>
    </ContentItem.B_30_15>

    <ContentItem.B_30_15>
      <Heading as="h2" size="MEDIUM" mb={1}>
        {props.t("Establishment")}
      </Heading>
      <Paragraph mb={0}>
        {props.t(
          "The establishment is the location or site of your food business. If it is a mobile food business, please use the location where it is normally stored overnight."
        )}
      </Paragraph>
    </ContentItem.B_30_15>
    <ContentItem.B_30_15>
      <Heading as="h2" size="MEDIUM" mb={1}>
        {props.t("Registering Local Authority")}
      </Heading>
      <Paragraph>
        {`**${props.lcName}**
        ${props.t(
          "is the local authority your registration will be sent to. Is this the correct local authority for your business? If unsure please use this Food Business Registration(www.gov.uk/food-business-registration) link to check using the location or site of your food business."
        )}`}
      </Paragraph>
    </ContentItem.B_30_15>
    <InsetText>
      {props.t("This service is also available in")}{" "}
      <Link
        style={{ textDecorationLine: "underline", cursor: "pointer" }}
        onClick={() =>
          i18n.changeLanguage(i18n.language === "cy" ? "en" : "cy")
        }
        id="changeLanguage"
      >
        {i18n.language === "cy" ? "Saesneg (English)" : "Welsh (Cymraeg)"}
      </Link>
    </InsetText>
    <PostForm action="/continue/index" csrfToken={props.csrfToken}>
      <ContinueButton type="begin" />
    </PostForm>
  </FsaLayout>
);

export default withTranslation("common")(SessionWrapper(Index));
