import type { App } from '../../types'

/**
 * Generate page key to page component map temp file
 */
export const preparePagesComponent = async (app: App): Promise<void> => {
  // generate page component map file
  const content = `\
import { defineAsyncComponent } from 'vue'

export const pagesComponent = {\
${app.pages
  .map(
    ({ key, componentFilePath }) => `
  ${JSON.stringify(key)}: defineAsyncComponent(() => import(${
      app.env.isDebug ? `/* webpackChunkName: "page-${key}" */` : ''
    }${JSON.stringify(app.dir.temp(componentFilePath))})),`
  )
  .join('')}
}
`

  await app.writeTemp('internal/pagesComponent.js', content)
}
