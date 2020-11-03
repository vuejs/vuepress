import type { App } from '../../types'

/**
 * Generate page path to page data map temp file
 */
export const preparePagesData = async (app: App): Promise<void> => {
  // generate page data map
  const content = `\
export const pagesData = {
${app.pages
  .map(
    ({ path, dataFilePath, dataFileChunkName }) => `\
  ${JSON.stringify(path)}: () => import(${
      dataFileChunkName ? `/* webpackChunkName: "${dataFileChunkName}" */` : ''
    }${JSON.stringify(dataFilePath)}).then(({ data }) => data),`
  )
  .join('\n')}
}
`

  await app.writeTemp('internal/pagesData.js', content)
}
