/**
 * Functions that return correct components for address pages dependent on the registration role (Partnership or Operator)
 * @module helpers/role
 */
import { HiddenTextAccessible } from "../../src/components";
import { Header, HintText, Paragraph } from "govuk-react";

const header = role => {
  return (
    <Header level={1} size="LARGE">
      What is the {roles(role)[0].toLowerCase()}'s address?
    </Header>
  );
};
const hintText = role => {
  return (
    <HintText>
      {roles(role)[0]} address is the contact address for the {roles(role)[1]}.
      For example home address for a sole trader or headquarters address for a
      limited company.
    </HintText>
  );
};

const extraInfo = role => {
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

function roles(role) {
  if (role === "Partnership") {
    return ["Partner", "main partner"];
  } else {
    return ["Operator", "operator"];
  }
}
module.exports = { header, hintText, extraInfo };
