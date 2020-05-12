import { Plugin } from '../app'

export const layoutComponentsPlugin: Plugin = {
  name: '@vuepress/internal-layout-components',

  async clientDynamicModules(app) {
    const layouts = app.themeApi.layouts

    const content = `\
import { defineAsyncComponent } from 'vue'

export const layoutComponents = {\
${layouts
  .map(
    ({ name, path }) => `
  ${JSON.stringify(name)}: defineAsyncComponent(() => import(${
      app.env.isDebug ? `/* webpackChunkName: "layout-${name}" */` : ''
    }${JSON.stringify(path)})),`
  )
  .join('')}
}`

    return {
      content,
      filename: 'layoutComponents.js',
      dirname: 'internal',
    }
  },
}
