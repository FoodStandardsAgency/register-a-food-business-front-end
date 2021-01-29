import { BackLink } from "govuk-react";
import ContentItem from "./ContentItem";
import { withTranslation } from "../../i18n.js";

const HiddenBackButton = () => <ContentItem.B_30_15 />;

const BackToStartButton = (props) => (
  <ContentItem.B_30_15>
    <BackLink href={props.href ? props.href : "/"} id="back-link">
      {props.t("Back to start")}
    </BackLink>
  </ContentItem.B_30_15>
);

const NormalBackButton = (props) => (
  <ContentItem.B_30_15>
    <BackLink
      href={props.href ? props.href : `/back${props.currentPage}`}
      id="back-link"
    >
      {props.t("Back")}
    </BackLink>
  </ContentItem.B_30_15>
);

const EditModeBackButton = (props) => (
  <ContentItem.B_30_15>
    <BackLink
      href={
        props.href
          ? props.href
          : `/edit/back${props.currentPage}?${props.editQuery}`
      }
      id="back-link"
    >
      {props.t("Back")}
    </BackLink>
  </ContentItem.B_30_15>
);

const BackButton = (props) => {
  if (props.hideBack) {
    return <HiddenBackButton />;
  }
  if (props.backToStart) {
    const backToStartLink = props.council ? `/new/${props.council}` : "/";
    return <BackToStartButton href={backToStartLink} t={props.t} />;
  }
  if (props.editModeFirstPage) {
    if (props.editModeFirstPage === props.currentPage) {
      return <HiddenBackButton />;
    } else {
      const editQuery = `edit=${props.editModeFirstPage.split("/")[1]}`;
      return (
        <EditModeBackButton
          href={props.href}
          currentPage={props.currentPage}
          editQuery={editQuery}
          t={props.t}
        />
      );
    }
  } else {
    return (
      <NormalBackButton
        href={props.href}
        currentPage={props.currentPage}
        t={props.t}
      />
    );
  }
};

export default withTranslation("common")(BackButton);
