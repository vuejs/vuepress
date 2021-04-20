import type { App } from '@vuepress/core'
import { getComponentsFromDir } from './getComponentsFromDir'
import type { RegisterComponentsPluginOptions } from './registerComponentsPlugin'

export const prepareClientAppEnhanceFile = async (
  app: App,
  options: RegisterComponentsPluginOptions,
  identifier: string
): Promise<string> => {
  // get components from directory
  const componentsFromDir = await getComponentsFromDir(options)

  // components from options will override components from dir
  // if they have the same component name
  const componentsMap: Record<string, string> = {
    ...componentsFromDir,
    ...options.components,
  }

  // client app enhance file content
  const content = `\
import { defineAsyncComponent } from 'vue'

export default ({ app }) => {\
${Object.entries(componentsMap).map(
  ([name, filepath]) => `
  app.component(${JSON.stringify(
    name
  )}, defineAsyncComponent(() => import(${JSON.stringify(filepath)})))`
)}
}
`

  // write temp file and return the file path
  return app.writeTemp(
    `register-components/clientAppEnhance.${identifier}.js`,
    content
  )
}
