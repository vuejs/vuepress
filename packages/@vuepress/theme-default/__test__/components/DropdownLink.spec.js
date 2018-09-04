import { mount, RouterLinkStub } from '@vue/test-utils'
import DropdownLink from '../../components/DropdownLink.vue'
import modeTestRunner from '@vuepress/test-utils/modeTestRunner'

function test (mode, localVue) {
  it(`$${mode} - renders dropdown link.`, () => {
    const item = {
      text: 'VuePress',
      items: [
        {
          text: 'Guide',
          link: '/guide/'
        },
        {
          text: 'Config Reference',
          link: '/config/'
        }
      ]
    }
    const wrapper = mount(DropdownLink, {
      localVue,
      stubs: {
        'router-link': RouterLinkStub
      },
      propsData: { item }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
}

modeTestRunner('DropdownLink', test)
