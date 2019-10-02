import { mount, RouterLinkStub } from '@vue/test-utils'
import { createLocalVue } from '@vuepress/test-utils/client'
import NavLink from '../../components/NavLink.vue'

describe('NavLink', () => {
  test('renders nav link with internal link', () => {
    const item = {
      link: '/',
      text: 'VuePress'
    }
    const wrapper = mount(NavLink, {
      localVue: createLocalVue(),
      stubs: {
        'router-link': RouterLinkStub
      },
      propsData: { item }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('renders nav link with external link', () => {
    const item = {
      link: 'http://vuejs.org/',
      text: 'Vue'
    }
    const wrapper = mount(NavLink, {
      localVue: createLocalVue(),
      propsData: { item }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
