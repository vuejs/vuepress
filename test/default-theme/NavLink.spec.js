import { mount, RouterLinkStub } from '@vue/test-utils'
import NavLink from '@/default-theme/NavLink.vue'
import localVue from '../localVue'

describe('NavLink.vue', () => {
  it('renders nav link with internal link', () => {
    const item = {
      link: '/',
      text: 'VuePress'
    }
    const wrapper = mount(NavLink, {
      localVue,
      stubs: {
        'router-link': RouterLinkStub
      },
      propsData: { item }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders nav link with external link', () => {
    const item = {
      link: 'http://vuejs.org/',
      text: 'Vue'
    }
    const wrapper = mount(NavLink, {
      localVue,
      propsData: { item }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
