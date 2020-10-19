import type { App } from '../../types'

/**
 * Generate page path to page data map temp file
 */
export const preparePagesData = async (app: App): Promise<void> => {
  // generate page data map
  const content = `\
${app.pages
  .map(({ key }, index) => `import page${index} from './pageData/${key}'`)
  .join('\n')}

export const pagesData = {
${app.pages
  .map(
    ({ path }, index) => `\
  ${JSON.stringify(path)}: page${index},`
  )
  .join('\n')}
}
`

  await app.writeTemp('internal/pagesData.js', content)
}
