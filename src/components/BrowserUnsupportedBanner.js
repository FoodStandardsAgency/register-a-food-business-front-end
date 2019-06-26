import { WarningText } from "govuk-react";

const BrowserWarning = props => (
  <WarningText>Browser unsupported - TODO more text here</WarningText>
);

const BrowserUnsupportedBanner = props => {
  if (props.supportedBrowser) {
    return null;
  } else {
    return <BrowserWarning />;
  }
};

export default BrowserUnsupportedBanner;
