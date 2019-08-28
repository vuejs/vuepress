import { mount, RouterLinkStub } from '@vue/test-utils'
import DropdownLink from '../../components/DropdownLink.vue'
// import createLocalVue from "@vuepress/test-utils/client/createLocalVue";

import Router from 'vue-router'
import VuePress from '@vuepress/core/lib/client/plugins/VuePress'
import dataMixin from '@vuepress/core/lib/client/dataMixin'
import { createLocalVue } from '@vue/test-utils'

import mockComponent from './mockComponent'
import siteData from './siteData'
import ClientComputedMixin from '@vuepress/core/lib/node/ClientComputedMixin'

const LocalVue = function () {
  const localVue = createLocalVue()
  localVue.use(Router)
  localVue.use(VuePress)

  // register global component
  localVue.component('OutboundLink', mockComponent('outbound-link'))
  localVue.component(siteData.pages[0].key, mockComponent('page-component'))
  localVue.mixin(dataMixin(ClientComputedMixin, siteData, localVue))
  return localVue
}

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
      localVue: LocalVue(),
      stubs: {
        'router-link': RouterLinkStub
      },
      propsData: { item }
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
