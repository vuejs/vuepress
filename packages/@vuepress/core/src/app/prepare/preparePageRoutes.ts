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

  // add page route
  routes.push(`
  {
    name: ${JSON.stringify(key)},
    path: ${JSON.stringify(path)},
    component: Vuepress,
    meta: { title: ${JSON.stringify(title)} },
  },`)

  // paths that should redirect to this page
  const redirects = new Set<string>()

  // redirect from decoded path
  redirects.add(decodeURI(path))

  // redirect from index path
  if (/\/$/.test(path)) {
    const indexPath = path + 'index.html'
    redirects.add(indexPath)
  }

  // redirect from inferred path
  if (pathInferred !== null) {
    redirects.add(pathInferred)
    redirects.add(encodeURI(pathInferred))
  }

  // redirect from filename path
  if (filePathRelative !== null) {
    const filenamePath = ensureLeadingSlash(filePathRelative)
    redirects.add(filenamePath)
    redirects.add(encodeURI(filenamePath))
  }

  // avoid redirect from the page path itself
  redirects.delete(path)

  // add redirect routes
  redirects.forEach((redirect) => {
    routes.push(`
  {
    path: ${JSON.stringify(redirect)},
    redirect: ${JSON.stringify(path)},
  },`)
  })

  const content = `\
import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

export default [\
${routes.join('')}
]
`

  await app.writeTemp(routesFilePathRelative, content)
}
