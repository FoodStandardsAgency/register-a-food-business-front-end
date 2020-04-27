import {
    FsaLayout,
    SessionWrapper,
    BackButton,
    ContinueButton,
    BusinessTypeLookup,
    ContentItem,
    ProcessedErrorSummary,
    OnHandleErrorClick
} from "../src/components";
import { Heading } from "govuk-react";
import PropTypes from "prop-types";

const BusinessType = (props) => (
    <FsaLayout {...props}>
        <BackButton {...props} />
        <ProcessedErrorSummary
            validatorErrors={props.validatorErrors}
            onHandleErrorClick={OnHandleErrorClick}
        />
        <Heading as="h1" size="LARGE">
            What kind of food business are you registering?
        </Heading>
        <form action={props.formAction} method="post">
            <ContentItem.B_30_15>
                <ContentItem.B_30_15>
                    <BusinessTypeLookup id="businessTypeLookup" {...props} />
                </ContentItem.B_30_15>
            </ContentItem.B_30_15>
            <ContinueButton {...props} />
        </form>
    </FsaLayout>
);

export default SessionWrapper(BusinessType);

BusinessType.propTypes = {
    cumulativeFullAnswers: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ])
    ),
    validatorErrors: PropTypes.objectOf(PropTypes.string)
};
