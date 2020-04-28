import { HiddenTextAccessible } from "./";
import { Paragraph } from "govuk-react";

const PartnershipDescription = () => (
    <HiddenTextAccessible summaryText={"What is a partnership?"}>
        <Paragraph mb={0}>
            In a partnership, you and your partner (or partners) personally
            share responsibility for your food business
        </Paragraph>
    </HiddenTextAccessible>
);

export default PartnershipDescription;
