var role = role => {
  if (role === "Partnership") {
    return ["Partner", "main partner"];
  } else {
    return ["Operator", "operator"];
  }
};
module.exports = { role };
