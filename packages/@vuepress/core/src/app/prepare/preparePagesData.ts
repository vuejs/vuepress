import type { App } from '../../types'

/**
 * Generate page path to page data map temp file
 */
export const preparePagesData = async (app: App): Promise<void> => {
  // generate page data map
  const content = `\
export const pagesData = {\
${app.pages
  .map(
    ({ key, path, dataFilePath, dataFileChunkName }) => `
  // path: ${path}
  ${JSON.stringify(key)}: () => import(${
      dataFileChunkName ? `/* webpackChunkName: "${dataFileChunkName}" */` : ''
    }${JSON.stringify(dataFilePath)}).then(({ data }) => data),`
  )
  .join('')}
}
`

  await app.writeTemp('internal/pagesData.js', content)
}
