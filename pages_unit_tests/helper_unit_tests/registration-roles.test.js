import registrationRole from "../../pages/helpers/registration-roles";

const partnershipArr = ["Partnership", "Partnership contact"];
const operatorArr = ["Operator", "Operator"];
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
