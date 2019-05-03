/**
 * Functions that return correct components for address pages dependent on the registration role (Partnership or Operator)
 * @module common/partnership-common
 */
import { HiddenTextAccessible } from "../../src/components";
import { Paragraph } from "govuk-react";

const whatIsAPartnership = () => {
  return (
    <HiddenTextAccessible summaryText={"What is a partnership?"}>
      <Paragraph mb={0}>
        In a partnership, you and your partner (or partners) personally share
        responsibility for your food business
      </Paragraph>
    </HiddenTextAccessible>
  );
};

module.exports = { whatIsAPartnership };
