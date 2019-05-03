/**
 * Returns array of versions of role used on the operator address pages and the summary page
 * @module pages/helpers/registration-role
 */

var role = role => {
  if (role === "Partnership") {
    return ["Partnership", "Partnership contact"];
  } else {
    return ["Operator", "Operator"];
  }
};
module.exports = { role };
