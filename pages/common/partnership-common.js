/**
 * Functions that return correct components for partnership pages
 * @module common/partnership-common
 */
import { HiddenTextAccessible } from "../../src/components";
import { Paragraph } from "govuk-react";

const whatIsAPartnership = () => {
  const key = "partnership-hidden-text";
  return (
    <HiddenTextAccessible summaryText={"What is a partnership?"} key={key}>
      <Paragraph mb={0} id={key}>
        In a partnership, you and your partner (or partners) personally share
        responsibility for your food business
      </Paragraph>
    </HiddenTextAccessible>
  );
};

module.exports = { whatIsAPartnership };
