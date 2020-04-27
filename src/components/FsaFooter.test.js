import FsaFooter from "../components/FsaFooter";
import { shallow } from "enzyme";

describe("<FsaFooter />", () => {
    it("renders without crashing", () => {
        const wrapper = shallow(<FsaFooter />);
        expect(wrapper.length).toBe(1);
    });
});
