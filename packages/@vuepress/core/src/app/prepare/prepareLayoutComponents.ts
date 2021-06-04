import type { App } from '../../types'

/**
 * Generate layout components temp file
 */
export const prepareLayoutComponents = async (app: App): Promise<void> => {
  const content = `\
import { defineAsyncComponent } from 'vue'

export const layoutComponents = {\
${Object.entries(app.layouts)
  .map(
    ([name, path]) => `
  ${JSON.stringify(name)}: defineAsyncComponent(() => import(${
      app.env.isDebug ? `/* webpackChunkName: "layout-${name}" */` : ''
    }${JSON.stringify(path)})),`
  )
  .join('')}
}
`

  await app.writeTemp('internal/layoutComponents.js', content)
}
