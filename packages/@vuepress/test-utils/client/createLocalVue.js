import { createLocalVue } from '@vue/test-utils'
import dataMixin from '@vuepress/core/lib/client/dataMixin'
import Router from 'vue-router'
import mockComponent from './mockComponent'
import siteData from './siteData'
import ClientComputedMixin from '@vuepress/core/lib/node/ClientComputedMixin'

module.exports = function () {
  const localVue = createLocalVue()
  localVue.use(Router)

  // register global component
  localVue.component('OutboundLink', mockComponent('outbound-link'))
  localVue.component(siteData.pages[0].key, mockComponent('page-component'))
  localVue.mixin(dataMixin(ClientComputedMixin, siteData))
  return localVue
}
