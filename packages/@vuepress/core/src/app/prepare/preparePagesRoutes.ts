import { ensureLeadingSlash } from '@vuepress/shared'
import type { App } from '../../types'

/**
 * Generate routes temp file
 */
export const preparePagesRoutes = async (app: App): Promise<void> => {
  const content = `\
import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

export const pagesRoutes = [\
${app.pages
  .map(({ key, path, pathInferred, filePathRelative, title }) => {
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

    return routes.join('')
  })
  .join('')}
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: Vuepress,
  },
]
`

  await app.writeTemp('internal/pagesRoutes.js', content)
}
