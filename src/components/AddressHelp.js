import React from "react";
import { ContentItem } from "../../src/components";
import { Header, HintText } from "govuk-react";
import { PartnershipDescription, OperatorDescription } from "./";

const AddressHelp = (props) => {
    return props.role === "Partnership" ? (
        <React.Fragment>
            <Header level={1} size="LARGE">
                What is the partnership contact's address?
            </Header>
            <ContentItem.B_30_15>
                <HintText>
                    Partnership address is the contact address for the partner
                    who is the main point of contact.
                </HintText>
            </ContentItem.B_30_15>
            <PartnershipDescription />
        </React.Fragment>
    ) : (
        <React.Fragment>
            <Header level={1} size="LARGE">
                What is the operator's address?
            </Header>
            <ContentItem.B_30_15>
                <HintText>
                    Operator address is the contact address for the operator.
                    For example home address for a sole trader or headquarters
                    address for a limited company.
                </HintText>
            </ContentItem.B_30_15>
            <OperatorDescription />
        </React.Fragment>
    );
};

export default AddressHelp;
