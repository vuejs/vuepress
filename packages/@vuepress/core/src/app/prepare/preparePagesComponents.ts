import type { App } from '../../types'

/**
 * Generate page key to page component map temp file
 */
export const preparePagesComponents = async (app: App): Promise<void> => {
  // generate page component map file
  const content = `\
import { defineAsyncComponent } from 'vue'

export const pagesComponents = {\
${app.pages
  .map(
    ({ path, componentFilePath, componentFileChunkName }) => `
  ${JSON.stringify(path)}: defineAsyncComponent(() => import(${
      componentFileChunkName
        ? `/* webpackChunkName: "${componentFileChunkName}" */`
        : ''
    }${JSON.stringify(componentFilePath)})),`
  )
  .join('')}
}
`

  await app.writeTemp('internal/pagesComponents.js', content)
}
