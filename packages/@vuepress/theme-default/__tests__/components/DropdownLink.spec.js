import { mount, RouterLinkStub } from '@vue/test-utils'
import DropdownLink from '../../components/DropdownLink.vue'
import { createLocalVue } from '@vuepress/test-utils/client'

describe('DropdownLink', () => {
  test('renders dropdown link.', () => {
    const item = {
      text: 'Learn More',
      ariaLabel: 'Learn More Select',
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
        'RouterLink': RouterLinkStub
      },
      propsData: { item }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
