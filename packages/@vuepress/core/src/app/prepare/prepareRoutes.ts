import type { App } from '../../types'

/**
 * Generate routes temp file
 */
export const prepareRoutes = async (app: App): Promise<void> => {
  const content = `\
import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

export const routes = [\
${app.pages
  .map(({ key, path, pathInferred }) => {
    const routesMap: Record<string, string> = {}

    // page route
    routesMap[path] = `
  {
    name: ${JSON.stringify(key)},
    path: ${JSON.stringify(path)},
    component: Vuepress,
  },`

    // redirect from decoded path
    const decodedPath = decodeURIComponent(path)
    if (decodedPath !== path) {
      routesMap[decodedPath] = `
  {
    path: ${JSON.stringify(decodedPath)},
    redirect: ${JSON.stringify(path)},
  },`
    }

    // redirect from index path
    if (/\/$/.test(path)) {
      const indexPath = path + 'index.html'
      routesMap[indexPath] = `
  {
    path: ${JSON.stringify(indexPath)},
    redirect: ${JSON.stringify(path)},
  },`
    }

    // redirect from inferred path
    if (pathInferred !== null && pathInferred !== path) {
      routesMap[pathInferred] = `
  {
    path: ${JSON.stringify(pathInferred)},
    redirect: ${JSON.stringify(path)},
  },`
    }

    return Object.values(routesMap).join('')
  })
  .join('')}
  {
    path: '/:catchAll(.*)',
    component: Vuepress,
  },
]
`

  await app.writeTemp('internal/routes.js', content)
}
