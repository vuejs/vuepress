const { createLocalVue } = require('@vue/test-utils')
const dataMixin = require('@vuepress/core/lib/app/dataMixin').default
const I18n = require('@vuepress/core/lib/prepare/I18n')
const Router = require('vue-router')
const mockComponent = require('./mockComponent')
const { docsModes } = require('./meta')

function getLocalVueByMode (mode) {
  const localVue = createLocalVue()
  localVue.use(Router)

  // register global component
  localVue.component('OutboundLink', mockComponent('outbound-link'))

  const { siteData } = require(`${mode.docsTempPath}/internal/siteData.js`)
  localVue.component(siteData.pages[0].key, mockComponent('page-component'))
  localVue.mixin(dataMixin(I18n, siteData))
  return localVue
}

/**
 * Used to test components in VuePress at different mode.
 * Since VuePress has two main modes, i18n or normal mode, we need to make
 * sure that the core Vue components in VuePress work well in both modes.
 * @param description
 * @param testFn
 */
module.exports = function modeTestRunner (description, testFn) {
  docsModes.forEach(mode => {
    describe(description, () => {
      testFn(mode.name, getLocalVueByMode(mode))
    })
  })
}
