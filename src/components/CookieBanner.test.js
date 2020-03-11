import CookieBanner from '../components/CookieBanner'
import { shallow } from 'enzyme'

describe('<CookieBanner />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<CookieBanner />)
    expect(wrapper.length).toBe(1)
  })
})
