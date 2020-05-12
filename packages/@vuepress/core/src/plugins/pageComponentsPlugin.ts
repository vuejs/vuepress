import { Plugin } from '../app'

export const pageComponentsPlugin: Plugin = {
  name: '@vuepress/internal-page-components',

  async clientDynamicModules(app) {
    const content = `\
import { defineAsyncComponent } from 'vue'

export const pageComponents = {\
${app.pages
  .filter(({ filePath }) => filePath)
  .map(
    ({ key, filePath }) => `
  ${JSON.stringify(key)}: defineAsyncComponent(() => import(${
      app.env.isDebug ? `/* webpackChunkName: "page-${key}" */` : ''
    }${JSON.stringify(filePath)})),`
  )
  .join('')}
}`

    return {
      content,
      filename: 'pageComponents.js',
      dirname: 'internal',
    }
  },
}
