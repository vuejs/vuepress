import { ensureLeadingSlash } from '@vuepress/shared'
import type { App, Page } from '../../types'

/**
 * Generate page routes temp file of a single page
 */
export const preparePageRoutes = async (
  app: App,
  {
    key,
    path,
    pathInferred,
    filePathRelative,
    title,
    routesFilePathRelative,
  }: Page
): Promise<void> => {
  const routes: string[] = []

  // page route
  routes.push(`
  {
    name: ${JSON.stringify(key)},
    path: ${JSON.stringify(path)},
    component: Vuepress,
    meta: { title: ${JSON.stringify(title)} },
  },`)

  // redirect from decoded path
  const decodedPath = decodeURIComponent(path)
  if (decodedPath !== path) {
    routes.push(`
  {
    path: ${JSON.stringify(decodedPath)},
    redirect: ${JSON.stringify(path)},
  },`)
  }

  // redirect from index path
  if (/\/$/.test(path)) {
    const indexPath = path + 'index.html'
    routes.push(`
  {
    path: ${JSON.stringify(indexPath)},
    redirect: ${JSON.stringify(path)},
  },`)
  }

  // redirect from inferred path
  if (pathInferred !== null && pathInferred !== path) {
    routes.push(`
  {
    path: ${JSON.stringify(pathInferred)},
    redirect: ${JSON.stringify(path)},
  },`)
  }

  // redirect from filename path
  const filenamePath = filePathRelative
    ? ensureLeadingSlash(filePathRelative)
    : null
  if (filenamePath !== null && filenamePath !== path) {
    routes.push(`
  {
    path: ${JSON.stringify(filenamePath)},
    redirect: ${JSON.stringify(path)},
  },`)
  }

  const content = `\
import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

export default [\
${routes.join('')}
]
`

  await app.writeTemp(routesFilePathRelative, content)
}
