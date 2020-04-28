import React from "react";
import { ContentItem } from "../../src/components";
import { HintText } from "govuk-react";
import { PartnershipDescription, OperatorDescription } from "./";

const PartnershipHintText = () => (
    <ContentItem.B_30_15>
        <HintText>
            Contact details for the main point of contact for this business
        </HintText>
    </ContentItem.B_30_15>
);

const ContactDetailsHelp = (props) => {
    return props.role === "Partnership" ? (
        <React.Fragment>
            <PartnershipHintText />
            <PartnershipDescription />
        </React.Fragment>
    ) : (
        <OperatorDescription />
    );
};

export default ContactDetailsHelp;
