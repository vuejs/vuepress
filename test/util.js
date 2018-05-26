import { createLocalVue } from '@vue/test-utils'
import dataMixin from '@/app/dataMixin'
import Router from 'vue-router'
import { mockComponent } from './hoc'
import { siteData as i18nSiteData } from './.temp/siteData-i18n'
import { siteData as simpleSiteData } from './.temp/siteData-simple'

export function getRouter () {
  return new Router()
}

export function getLocalVueByMode (mode) {
  const localVue = createLocalVue()
  localVue.use(Router)

  // register global component
  localVue.component('OutboundLink', mockComponent('outbound-link'))

  // register page component in root route.
  localVue.component(i18nSiteData.pages[0].key, mockComponent('page-component'))
  localVue.component(simpleSiteData.pages[0].key, mockComponent('page-component'))

  // data mixin
  if (mode === 'i18n') {
    localVue.mixin(dataMixin(i18nSiteData))
  } else {
    localVue.mixin(dataMixin(simpleSiteData))
  }

  return localVue
}

export function modeTestRunner (description, testFn, modes = ['simple', 'i18n']) {
  if (!Array.isArray(modes)) {
    modes = [modes]
  }
  modes.forEach(mode => {
    describe(description, () => {
      testFn(mode, getLocalVueByMode(mode))
    })
  })
}
