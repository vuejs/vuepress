import { mount, RouterLinkStub } from '@vue/test-utils'
import DropdownLink from '../../components/DropdownLink.vue'
import { createLocalVue } from '@vuepress/test-utils/client'

describe('DropdownLink', () => {
  test('renders dropdown link.', () => {
    const item = {
      text: 'VuePress',
      items: [
        {
          text: 'Guide',
          link: '/guide/'
        },
        {
          text: 'Config Reference',
          link: '/config/',
          notFocusable: true
        }
      ]
    }
    const wrapper = mount(DropdownLink, {
      localVue: createLocalVue(),
      stubs: {
        'router-link': RouterLinkStub
      },
      propsData: { item, dropdownName: 'Languages' }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
