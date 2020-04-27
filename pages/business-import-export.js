import {
    FsaLayout,
    SessionWrapper,
    ContentItem,
    BackButton,
    ContinueButton,
    ProcessedErrorSummary,
    OnHandleErrorClick,
    HiddenTextAccessible
} from "../src/components";
import {
    Heading,
    Checkbox,
    MultiChoice,
    Paragraph,
    HintText
} from "govuk-react";
import PropTypes from "prop-types";

const ImportExportActivities = (props) => (
    <FsaLayout {...props}>
        <form action={props.formAction} method="post">
            <BackButton {...props} />
            <ProcessedErrorSummary
                validatorErrors={props.validatorErrors}
                onHandleErrorClick={OnHandleErrorClick}
            />
            <Heading as="h1" size="LARGE">
                Will this food business import or export any food from outside
                the UK?
            </Heading>
            <HintText mb={1}>
                This does not include any food imported or exported by other
                food businesses.
            </HintText>
            <Paragraph>Select all that apply</Paragraph>

            <ContentItem.B_30_15>
                <MultiChoice
                    label=""
                    meta={{
                        touched: true,
                        error: props.validatorErrors.import_export_activities
                    }}
                >
                    <Checkbox
                        name="directly_import"
                        id="import_export_activities_directly_import"
                        value="Directly import"
                        defaultChecked={
                            props.cumulativeFullAnswers.directly_import
                        }
                    >
                        Directly import food
                    </Checkbox>
                    <Checkbox
                        name="directly_export"
                        id="import_export_activities_directly_export"
                        value="Directly export"
                        defaultChecked={
                            props.cumulativeFullAnswers.directly_export
                        }
                    >
                        Directly export food
                    </Checkbox>
                    <Checkbox
                        name="no_import_export"
                        id="import_export_activities_none"
                        value="None"
                        defaultChecked={
                            props.cumulativeFullAnswers.no_import_export
                        }
                    >
                        No import or export activities
                    </Checkbox>
                </MultiChoice>
            </ContentItem.B_30_15>

            <ContentItem.B_30_15>
                <HiddenTextAccessible
                    id="hiddenTextImportExportActivities"
                    summary={
                        "More information about import and export activities"
                    }
                >
                    <span>
                        If a food business is directly importing or exporting
                        food outside of the UK, there are some extra
                        requirements for the business to follow.
                        <br />
                        <br />
                        Find out more by visiting the{" "}
                        <a
                            href="https://www.food.gov.uk/business-guidance/imports-exports"
                            target="_blank"
                            rel="noopener noreferrer"
                            id="link-fsa-website"
                        >
                            Food Standards Agency website (opens in new window)
                        </a>
                        .
                    </span>
                </HiddenTextAccessible>
            </ContentItem.B_30_15>

            <ContinueButton {...props} />
        </form>
    </FsaLayout>
);

export default SessionWrapper(ImportExportActivities);

ImportExportActivities.propTypes = {
    cumulativeFullAnswers: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ])
    ),
    validatorErrors: PropTypes.objectOf(PropTypes.string)
};
