import type { App } from '../../types'

/**
 * Generate routes temp file
 */
export const preparePagesRoutes = async (app: App): Promise<void> => {
  const content = `\
import { Vuepress } from '@vuepress/client/lib/components/Vuepress'
${app.pages
  .map(
    ({ routesFilePath }, index) =>
      `import pageRoutes${index} from '${routesFilePath}'`
  )
  .join('\n')}

export const pagesRoutes = [
${app.pages.map((_, index) => `  ...pageRoutes${index},`).join('\n')}
  {
    name: "404",
    path: "/:catchAll(.*)",
    component: Vuepress,
  },
]
`

  await app.writeTemp('internal/pagesRoutes.js', content)
}
