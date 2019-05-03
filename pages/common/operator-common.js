/**
 * Functions that return correct components for operator pages
 * @module common/operator-common
 */
import { HiddenTextAccessible } from "../../src/components";
import { Paragraph } from "govuk-react";

const whatIsABusinessOperator = () => {
  return (
    <HiddenTextAccessible summaryText={"What is a food business operator?"}>
      <Paragraph mb={0}>
        The operator is the person or people, charity or company who makes the
        decisions about the food business. They decide what it serves and how it
        operates.
      </Paragraph>
    </HiddenTextAccessible>
  );
};

module.exports = { whatIsABusinessOperator };
