import { BackLink } from "govuk-react";
import ContentItem from "./ContentItem";

const BackButton = props =>
  props.editModeFirstPage ? (
    <div />
  ) : (
    <ContentItem.B_30_15>
      <BackLink
        href={props.href ? props.href : "/back/" + props.originator}
        id="back-link"
      >
        Back
      </BackLink>
    </ContentItem.B_30_15>
  );
export default BackButton;
