import PartnersTable from "../components/PartnersTable.js";
import { shallow, mount } from "enzyme";

const partners = { partners: ["one", "two"] };

const emptyPartners = { partners: [] };

describe("<PartnersTable />", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<PartnersTable cumulativeFullAnswers={partners} />);
    expect(wrapper.length).toBe(1);
  });

  it("renders without crashing with no partners", () => {
    const wrapper = mount(
      <PartnersTable cumulativeFullAnswers={emptyPartners} />
    );
    expect(wrapper.instance()).toEqual(null);
  });

  it("renders without crashing with partners on the summary page", () => {
    const wrapper = mount(
      <PartnersTable
        cumulativeFullAnswers={{ partners: ["one", "two"] }}
        acPage={true}
      />
    );
    expect(wrapper.instance()).toEqual(null);
  });

  describe("when given partner table with two partners as the current page", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <PartnersTable
          partnerDetailsUrl="/partnership/partner-details"
          cumulativeFullAnswers={partners}
        />
      );
    });

    it("should render change link with id 0", () => {
      const changeLink = wrapper.find("#partner0RowChange");
      expect(changeLink.first().props().href).toBe(
        "/partnership/partner-details?id=0"
      );
    });

    it("should render change link with id 1", () => {
      const changeLink = wrapper.find("#partner1RowChange");
      expect(changeLink.first().props().href).toBe(
        "/partnership/partner-details?id=1"
      );
    });

    it("should render deleteButton with the correct index", () => {
      const deleteButton = wrapper.find("#deletePartnerButton0");
      expect(deleteButton.first().props().value).toBe(0);
    });

    it("should render deleteButton with the correct index", () => {
      const deleteButton = wrapper.find("#deletePartnerButton1");
      expect(deleteButton.first().props().value).toBe(1);
    });
  });
});
