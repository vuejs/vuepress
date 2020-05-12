import { Plugin, createClientData } from '../app'

export const siteDataPlugin: Plugin<{}> = {
  name: '@vuepress/internal-site-data',

  async clientDynamicModules(app) {
    const content = `\
export const siteData = ${JSON.stringify(createClientData(app), null, 2)}
`

    return {
      content,
      filename: 'siteData.js',
      dirname: 'internal',
    }
  },
}
