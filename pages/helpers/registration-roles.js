/**
 * Returns array of versions of role used on the operator address pages and the summary page
 * @module pages/helpers/registration-role
 */

var role = role => {
  if (role === "Partnership") {
    return ["Partner", "main partner", "Partnership contact"];
  } else {
    return ["Operator", "operator", "Operator"];
  }
};
module.exports = { role };
