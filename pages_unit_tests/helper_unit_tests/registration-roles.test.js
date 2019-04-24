import registrationRole from "../../pages/helpers/registration-roles";

const partnershipArr = ["Partner", "main partner", "Partnership contact"];
const operatorArr = ["Operator", "operator", "Operator"];
const partnershipRole = "Partnership";
const operatorRole = "Operator";

describe("Registration Role Helper", () => {
  it('returns partnership array when role = "Partnership"', () => {
    const roleArr = registrationRole.role(partnershipRole);
    expect(roleArr).toEqual(partnershipArr);
  });
  it('returns operator array when role = "Operator"', () => {
    const roleArr = registrationRole.role(operatorRole);
    expect(roleArr).toEqual(operatorArr);
  });
});
