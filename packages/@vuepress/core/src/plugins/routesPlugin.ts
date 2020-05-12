import { Plugin } from '../app'

export const routesPlugin: Plugin<{}> = {
  name: '@vuepress/internal-routes',

  async clientDynamicModules({ pages }) {
    const content = `\
import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

export const routes = [\
${pages.map(({ key, path, pathInferred }) => {
  const items: string[] = []

  // page route
  items.push(`
  {
    name: ${JSON.stringify(key)},
    path: ${JSON.stringify(path)},
    component: Vuepress,
  },`)

  // redirect from decoded path
  const decodedPath = decodeURIComponent(path)
  if (decodedPath !== path) {
    items.push(`
  {
    path: ${JSON.stringify(decodedPath)},
    redirect: ${JSON.stringify(path)},
  },`)
  }

  // redirect from index path
  if (/\/$/.test(path)) {
    items.push(`
  {
    path: ${JSON.stringify(path + 'index.html')},
    redirect: ${JSON.stringify(path)},
  },`)
  }

  // redirect from inferred path
  if (pathInferred !== null && pathInferred !== path) {
    items.push(`
  {
    path: ${JSON.stringify(pathInferred)},
    redirect: ${JSON.stringify(path)},
  },`)
  }

  return items.join('')
})}
  {
    path: '/:catchAll(.*)',
    component: Vuepress,
  },
]
`

    return {
      content,
      filename: 'routes.js',
      dirname: 'internal',
    }
  },
}
