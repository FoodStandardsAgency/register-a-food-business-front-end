import FindAddressButton from '../components/FindAddressButton'
import { shallow } from 'enzyme'

describe('<FindAddressButton />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<FindAddressButton />)
    expect(wrapper.length).toBe(1)
  })
})
