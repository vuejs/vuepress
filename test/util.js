import { createLocalVue } from '@vue/test-utils'
import OutboundLink from '@/default-theme/OutboundLink.vue'
import dataMixin from '@/app/dataMixin'
import { siteData as i18nSiteData } from './.temp/siteData-i18n'
import { siteData as simpleSiteData } from './.temp/siteData-simple'

export function getLocalVueByMode (mode) {
  const localVue = createLocalVue()
  if (mode === 'i18n') {
    localVue.mixin(dataMixin(i18nSiteData))
  } else {
    localVue.mixin(dataMixin(simpleSiteData))
  }
  localVue.component('OutboundLink', OutboundLink)
  return localVue
}

export function modeTestRunner (description, testFn) {
  ['simple', 'i18n'].forEach(mode => {
    describe(description, () => {
      testFn(mode, getLocalVueByMode(mode))
    })
  })
}
