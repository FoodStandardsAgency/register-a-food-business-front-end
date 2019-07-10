import { WarningText } from "govuk-react";

const BrowserUnsupportedBanner = props => (
  <WarningText>
    {`Your web browser ${props.browser} v${
      props.version
    } is out of date. You may not be able to
    complete the registration. Update your browser for more security, speed and
    the best experience on this site.`}
  </WarningText>
);

export default BrowserUnsupportedBanner;
