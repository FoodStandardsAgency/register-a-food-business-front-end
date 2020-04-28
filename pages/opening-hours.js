import {
    FsaLayout,
    SessionWrapper,
    ContentItem,
    BackButton,
    ContinueButton,
    ProcessedErrorSummary,
    OnHandleErrorClick
} from "../src/components";
import { Header, InputField, HintText } from "govuk-react";
import PropTypes from "prop-types";

const OpeningHours = (props) => (
    <FsaLayout {...props}>
        <form action={props.formAction} method="post">
            <BackButton {...props} />
            <ProcessedErrorSummary
                validatorErrors={props.validatorErrors}
                onHandleErrorClick={OnHandleErrorClick}
            />
            <Header level={1} size="LARGE">
                Opening hours
            </Header>
            <ContentItem.B_30_15>
                <HintText>
                    Fill in the expected opening times for this establishment
                    using 24 hour clocks. For example, 09:30 to 19:00.
                </HintText>
            </ContentItem.B_30_15>
            {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
            props.cumulativeFullAnswers.opening_day_monday ? (
                <ContentItem.B_20_20>
                    <InputField
                        input={{
                            name: "opening_hours_monday",
                            defaultValue:
                                props.cumulativeFullAnswers.opening_hours_monday
                        }}
                        id="opening_hours_monday"
                        meta={{
                            touched: true,
                            error: props.validatorErrors.opening_hours_monday
                        }}
                    >
                        <Header level={4} mb={1}>
                            Monday
                        </Header>
                    </InputField>
                </ContentItem.B_20_20>
            ) : null}
            {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
            props.cumulativeFullAnswers.opening_day_tuesday ? (
                <ContentItem.B_20_20>
                    <InputField
                        input={{
                            name: "opening_hours_tuesday",
                            defaultValue:
                                props.cumulativeFullAnswers
                                    .opening_hours_tuesday
                        }}
                        id="opening_hours_tuesday"
                        meta={{
                            touched: true,
                            error: props.validatorErrors.opening_hours_tuesday
                        }}
                    >
                        <Header level={4} mb={1}>
                            Tuesday
                        </Header>
                    </InputField>
                </ContentItem.B_20_20>
            ) : null}
            {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
            props.cumulativeFullAnswers.opening_day_wednesday ? (
                <ContentItem.B_20_20>
                    <InputField
                        input={{
                            name: "opening_hours_wednesday",
                            defaultValue:
                                props.cumulativeFullAnswers
                                    .opening_hours_wednesday
                        }}
                        id="opening_hours_wednesday"
                        meta={{
                            touched: true,
                            error: props.validatorErrors.opening_hours_wednesday
                        }}
                    >
                        <Header level={4} mb={1}>
                            Wednesday
                        </Header>
                    </InputField>
                </ContentItem.B_20_20>
            ) : null}
            {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
            props.cumulativeFullAnswers.opening_day_thursday ? (
                <ContentItem.B_20_20>
                    <InputField
                        input={{
                            name: "opening_hours_thursday",
                            defaultValue:
                                props.cumulativeFullAnswers
                                    .opening_hours_thursday
                        }}
                        id="opening_hours_thursday"
                        meta={{
                            touched: true,
                            error: props.validatorErrors.opening_hours_thursday
                        }}
                    >
                        <Header level={4} mb={1}>
                            Thursday
                        </Header>
                    </InputField>
                </ContentItem.B_20_20>
            ) : null}
            {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
            props.cumulativeFullAnswers.opening_day_friday ? (
                <ContentItem.B_20_20>
                    <InputField
                        input={{
                            name: "opening_hours_friday",
                            defaultValue:
                                props.cumulativeFullAnswers.opening_hours_friday
                        }}
                        id="opening_hours_friday"
                        meta={{
                            touched: true,
                            error: props.validatorErrors.opening_hours_friday
                        }}
                    >
                        <Header level={4} mb={1}>
                            Friday
                        </Header>
                    </InputField>
                </ContentItem.B_20_20>
            ) : null}
            {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
            props.cumulativeFullAnswers.opening_day_saturday ? (
                <ContentItem.B_20_20>
                    <InputField
                        input={{
                            name: "opening_hours_saturday",
                            defaultValue:
                                props.cumulativeFullAnswers
                                    .opening_hours_saturday
                        }}
                        id="opening_hours_saturday"
                        meta={{
                            touched: true,
                            error: props.validatorErrors.opening_hours_saturday
                        }}
                    >
                        <Header level={4} mb={1}>
                            Saturday
                        </Header>
                    </InputField>
                </ContentItem.B_20_20>
            ) : null}
            {props.cumulativeFullAnswers.opening_days_start === "Every day" ||
            props.cumulativeFullAnswers.opening_day_sunday ? (
                <ContentItem.B_20_20>
                    <InputField
                        input={{
                            name: "opening_hours_sunday",
                            defaultValue:
                                props.cumulativeFullAnswers.opening_hours_sunday
                        }}
                        id="opening_hours_sunday"
                        meta={{
                            touched: true,
                            error: props.validatorErrors.opening_hours_sunday
                        }}
                    >
                        <Header level={4} mb={1}>
                            Sunday
                        </Header>
                    </InputField>
                </ContentItem.B_20_20>
            ) : null}
            <ContinueButton {...props} />
        </form>
    </FsaLayout>
);

export default SessionWrapper(OpeningHours);

OpeningHours.propTypes = {
    cumulativeFullAnswers: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ])
    ),
    validatorErrors: PropTypes.objectOf(PropTypes.string)
};
