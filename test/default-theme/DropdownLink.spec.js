import { mount, RouterLinkStub } from '@vue/test-utils'
import DropdownLink from '@/default-theme/DropdownLink.vue'
import localVue from '../localVue'

describe('DropdownLink.vue', () => {
  it('renders dropdown link', () => {
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
})
