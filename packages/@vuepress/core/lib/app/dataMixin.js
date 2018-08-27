/* global VUEPRESS_TEMP_PATH */

import Vue from 'vue'

export default function dataMixin (I18n, siteData) {
  prepare(siteData)
  const store = new Vue({
    data: {
      siteData,
      disableScrollBehavior: false
    }
  })
  Vue.$store = store

  if (module.hot) {
    module.hot.accept(VUEPRESS_TEMP_PATH + '/internal/siteData.js', () => {
      prepare(siteData)
      store.siteData = siteData
    })
  }

  const I18nConstructor = I18n(store)
  const i18n = new I18nConstructor()
  const descriptors = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(i18n))
  const computed = {}
  Object.keys(descriptors).reduce((computed, key) => {
    if (key.startsWith('$')) {
      computed[key] = descriptors[key].get
    }
    return computed
  }, computed)

  return { computed }
}

function prepare (siteData) {
  if (siteData.locales) {
    Object.keys(siteData.locales).forEach(path => {
      siteData.locales[path].path = path
    })
  }
  Object.freeze(siteData)
}
