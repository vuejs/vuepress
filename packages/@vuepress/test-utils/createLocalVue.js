const { createLocalVue } = require('@vue/test-utils')
const dataMixin = require('@vuepress/core/lib/app/dataMixin').default
const I18n = require('@vuepress/core/lib/prepare/I18n')
const Router = require('vue-router')
const mockComponent = require('./mockComponent')
const siteData = require('./siteData')

export default function () {
  const localVue = createLocalVue()
  localVue.use(Router)

  // register global component
  localVue.component('OutboundLink', mockComponent('outbound-link'))
  localVue.component(siteData.pages[0].key, mockComponent('page-component'))
  localVue.mixin(dataMixin(I18n, siteData))
  return localVue
}
