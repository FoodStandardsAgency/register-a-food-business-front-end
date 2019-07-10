import {
  FsaLayout,
  SessionWrapper,
  ContentItem,
  ContinueButton,
  BrowserUnsupportedBanner
} from "../src/components";
import { Header, Paragraph, InsetText } from "govuk-react";

const Index = props => (
  <FsaLayout {...props}>
    {!props.isBrowserSupported ? (
      <BrowserUnsupportedBanner
        browser={props.browser}
        version={props.browserVersion}
      />
    ) : null}
    <Header level={1}>Register a food business</Header>

    <ContentItem.B_30_15>
      <ContentItem.B_30_15>
        <Paragraph>
          When you start a new food business or take over an existing business,
          you must register with your local authority. You should do this at
          least **28 days** before trading or before food operations start.
        </Paragraph>
        <Paragraph mb={0}>
          Your registration will be sent to the correct local authority based on
          your trading location.
        </Paragraph>
      </ContentItem.B_30_15>

      <InsetText className="bold">
        <Paragraph mb={0}>
          During this registration, you may come across a few specialist terms,
          which we have described below:
        </Paragraph>
      </InsetText>

      <ContentItem.B_30_15>
        <Header level={2} size="MEDIUM" mb={1}>
          Food business operator
        </Header>
        <Paragraph mb={0}>
          The operator is the person, charity or company who makes the decisions
          about the food business. They decide what it serves and how it
          operates.
        </Paragraph>
      </ContentItem.B_30_15>

      <ContentItem.B_30_15>
        <Header level={2} size="MEDIUM" mb={1}>
          Establishment
        </Header>
        <Paragraph mb={0}>
          The establishment is the location or site of your food business. If it
          is a mobile food business, please use the location where it is
          normally stored overnight.
        </Paragraph>
      </ContentItem.B_30_15>
    </ContentItem.B_30_15>

    <form action="/continue/index" method="post">
      <ContinueButton type="begin" />
    </form>
  </FsaLayout>
);

export default SessionWrapper(Index);
