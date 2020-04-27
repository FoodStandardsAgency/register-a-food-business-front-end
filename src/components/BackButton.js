import { BackLink } from "govuk-react";
import ContentItem from "./ContentItem";

const HiddenBackButton = () => <ContentItem.B_30_15 />;

const NormalBackButton = (props) => (
    <ContentItem.B_30_15>
        <BackLink
            href={props.href ? props.href : `/back${props.currentPage}`}
            id="back-link"
        >
            Back
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
            Back
        </BackLink>
    </ContentItem.B_30_15>
);

const BackButton = (props) => {
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
                />
            );
        }
    } else {
        return (
            <NormalBackButton
                href={props.href}
                currentPage={props.currentPage}
            />
        );
    }
};

export default BackButton;
