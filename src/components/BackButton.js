import { BackLink } from "govuk-react";
import ContentItem from "./ContentItem";

const BackButton = props =>
  props.editModeFirstPage === props.currentPage ? (
    <div />
  ) : (
    <ContentItem.B_30_15>
      <h1>
        1: {props.editModeFirstPage}
        2: {props.currentPage}
      </h1>
      <BackLink
        href={props.href ? props.href : "/back/" + props.originator}
        id="back-link"
      >
        Back
      </BackLink>
    </ContentItem.B_30_15>
  );
export default BackButton;
