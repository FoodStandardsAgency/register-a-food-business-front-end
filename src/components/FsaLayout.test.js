import FsaLayout from "../components/FsaLayout";
import { shallow } from "enzyme";

describe("<FsaLayout />", () => {
    it("renders without crashing", () => {
        const wrapper = shallow(<FsaLayout />);
        expect(wrapper.length).toBe(1);
    });

    it("renders child elements", () => {
        const wrapper = shallow(
            <FsaLayout>
                <div>A child element</div>
            </FsaLayout>
        );
        expect(wrapper.contains(<div>A child element</div>)).toBe(true);
    });
});
