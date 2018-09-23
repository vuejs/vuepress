import { mount, RouterLinkStub } from '@vue/test-utils'
import DropdownLink from '../../components/DropdownLink.vue'
import createLocalVue from '@vuepress/test-utils/createLocalVue'

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
          link: '/config/'
        }
      ]
    }
    const wrapper = mount(DropdownLink, {
      localVue: createLocalVue(),
      stubs: {
        'router-link': RouterLinkStub
      },
      propsData: { item }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
