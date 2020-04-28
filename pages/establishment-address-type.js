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
import { Header, Radio, MultiChoice, Paragraph } from "govuk-react";
import PropTypes from "prop-types";

const EstablishmentAddressType = (props) => (
    <FsaLayout {...props}>
        <BackButton {...props} />
        <ProcessedErrorSummary
            validatorErrors={props.validatorErrors}
            onHandleErrorClick={OnHandleErrorClick}
        />
        <Header level={1} size="LARGE">
            Where is this establishment located?
        </Header>

        <HiddenTextAccessible summaryText={"What is an establishment?"}>
            <Paragraph mb={0}>
                An establishment is the location of your food business. If it is
                a mobile food business, please use the location where it is
                normally stored overnight.
            </Paragraph>
        </HiddenTextAccessible>

        <form action={props.formAction} method="post">
            <ContentItem.B_45_30>
                <MultiChoice
                    label=""
                    meta={{
                        touched: true,
                        error: props.validatorErrors.establishment_type
                    }}
                >
                    <Radio
                        name="establishment_type"
                        value="Mobile or moveable premises"
                        id="establishment_type_mobile_moveable"
                        defaultChecked={
                            props.cumulativeFullAnswers.establishment_type ===
                            "Mobile or moveable premises"
                        }
                    >
                        In a mobile or moveable premises
                    </Radio>
                    <Radio
                        name="establishment_type"
                        value="Home or domestic premises"
                        id="establishment_type_home_domestic"
                        defaultChecked={
                            props.cumulativeFullAnswers.establishment_type ===
                            "Home or domestic premises"
                        }
                    >
                        In a home or domestic premises
                    </Radio>
                    <Radio
                        name="establishment_type"
                        value="Place of business or commercial premises"
                        id="establishment_type_business_commercial"
                        defaultChecked={
                            props.cumulativeFullAnswers.establishment_type ===
                            "Place of business or commercial premises"
                        }
                    >
                        In a commercial or public premises
                    </Radio>
                </MultiChoice>
            </ContentItem.B_45_30>

            <ContinueButton {...props} />
        </form>
    </FsaLayout>
);

export default SessionWrapper(EstablishmentAddressType);

EstablishmentAddressType.propTypes = {
    cumulativeFullAnswers: PropTypes.objectOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.string)
        ])
    ),
    validatorErrors: PropTypes.objectOf(PropTypes.string)
};
