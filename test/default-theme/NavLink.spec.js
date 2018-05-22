import { mount, RouterLinkStub } from '@vue/test-utils'
import { modeTestRunner } from '../util'
import NavLink from '@/default-theme/NavLink.vue'

function test (mode, localVue) {
  it(`$${mode} - renders nav link with internal link`, () => {
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

  it(`$${mode} - renders nav link with external link`, () => {
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
}

modeTestRunner('NavLink', test)
