import type { App } from '../../types'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
`

/**
 * Generate site data temp file
 */
export const prepareSiteData = async (app: App): Promise<void> => {
  let content = `\
export const siteData = ${JSON.stringify(app.siteData, null, 2)}
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/siteData.js', content)
}
