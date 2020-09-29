import type { App } from '../../types'

/**
 * Generate page components temp file
 */
export const preparePageComponents = async (app: App): Promise<void> => {
  // generate page component files
  for (const page of app.pages) {
    await app.writeTemp(
      page.componentFilePathRelative,
      page.componentFileContent
    )
  }

  // generate page components map file
  const content = `\
import { defineAsyncComponent } from 'vue'

export const pageComponents = {\
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

  await app.writeTemp('internal/pageComponents.js', content)
}
