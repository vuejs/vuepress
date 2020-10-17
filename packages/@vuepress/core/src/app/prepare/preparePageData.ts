import type { App, PageData, Page } from '../../types'

export const generateClientPageData = ({
  key,
  path,
  title,
  frontmatter,
  excerpt,
  headers,
}: Page): PageData => {
  return {
    key,
    path,
    title,
    frontmatter,
    excerpt,
    headers,
  }
}

/**
 * Generate page data temp file
 */
export const preparePageData = async (app: App): Promise<void> => {
  // generate data of all pages
  for (const page of app.pages) {
    await app.writeTemp(
      `internal/pagesData/${page.key}.js`,
      `export default ${JSON.stringify(
        generateClientPageData(page),
        null,
        2
      )}\n`
    )
  }

  // generate pagesData entry
  const content = `\
${app.pages
  .map(({ key }, index) => `import page${index} from './${key}'`)
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

  await app.writeTemp('internal/pagesData/index.js', content)
}
