/* global VUEPRESS_TEMP_PATH */

import Vue from 'vue'
import dataMixin from '@internal/data-mixins'

export default function (siteData) {
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

  return dataMixin(siteData)
}

function prepare (siteData) {
  if (siteData.locales) {
    Object.keys(siteData.locales).forEach(path => {
      siteData.locales[path].path = path
    })
  }
  Object.freeze(siteData)
}
